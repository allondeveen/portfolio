# ADR 0004: Deploy on Cloudflare Workers

> **Status: Accepted**
>
> **Decision state:** The website, CMS, and maintenance application are deployed as Cloudflare Workers.

## Context

The portfolio has three application deployment units: a public React Router website, a Payload CMS, and an independent maintenance application. They require a managed runtime that can execute server-side TypeScript, expose separate public entry points, supply server-only configuration, integrate with the selected caching and media-delivery design, and support coordinated deployment and rollback.

The workload is modest and does not require independently managed servers or containers. The hosting choice is therefore driven by delivery characteristics, operational fit, and demonstration value rather than by a scale requirement.

### 1. Demonstration objective

The portfolio is both a working website and a demonstration of engineering knowledge. It is intended to demonstrate the use of a modern managed hosting platform, including an edge runtime, globally distributed request handling, platform-managed caching, serverless configuration, and integration with managed storage.

Cloudflare Workers provides a meaningful environment in which to demonstrate those concerns. The website and CMS are real server-side applications rather than static examples, and the separate maintenance Worker exercises platform routing and failure isolation during deployments.

This objective is a legitimate reason for the choice, but it is not presented as evidence that this portfolio needs global compute scale. The functional requirements could be satisfied by a conventional regional Node.js deployment with less runtime-specific integration.

### 2. Public delivery and caching

Workers can receive visitor requests through Cloudflare's distributed network. Lightweight request processing can consequently occur near visitors, reducing the network distance to the first application runtime and avoiding the need to provision application servers for individual regions.

For this portfolio, however, the largest expected performance benefit comes from Cloudflare caching eligible final page responses near visitors. A cache hit can return the rendered response without executing the complete website-to-CMS request path. Edge execution alone does not make every request fast.

On a cache miss, the website still authenticates to and calls the CMS, the CMS queries D1, and the website renders the response. A native D1 binding does not remove downstream calls, query execution, serialization, or rendering from the request path. These operations can therefore dominate latency for uncached pages, previews, forms, and AI requests. This trade-off is accepted; cache effectiveness and uncached response time must be measured separately.

Using a Cloudflare-native database reduces cross-provider integration, but it does not remove service calls, authentication, rendering, consistency concerns, or the need for caching. Database selection is intentionally owned by [ADR 0005](0005-use-cloudflare-d1-for-relational-storage.md), not inferred from the Worker hosting decision.

### 3. Platform fit

Cloudflare also owns D1, the response cache, application routing used by maintenance mode, public R2 media delivery, and cross-cutting traffic controls. Hosting the applications on Workers keeps those capabilities within one platform and gives the project direct access to Worker bindings and Cloudflare configuration.

The separate maintenance Worker is particularly compatible with this model. Cloudflare can route application traffic to a minimal deployment that does not depend on the website, CMS, or relational database while a coordinated deployment, migration, rollback, or recovery operation is in progress.

This concentration reduces integration between hosting providers but increases dependence on Cloudflare. A provider outage, account problem, platform constraint, or configuration error can affect several application and operational safeguards at once.

### 4. Runtime constraints

Workers is not a conventional Node.js server environment. The website, Payload CMS, framework adapters, libraries, and build output must remain compatible with the Worker runtime and its resource and execution constraints. Local development must emulate the deployed runtime closely enough to detect incompatibilities before release.

Long-running operational work is kept outside request-serving Workers. GitHub Actions owns coordinated deployment, rollback, recovery, and long-running migrations. Persistent application state is stored in D1 and R2 rather than in Worker instances. D1 Time Travel provides migration recovery through pre-migration bookmarks managed by the pipeline, as defined in ADR 0005 and Development and operations.

## Decision

Deploy the application components on Cloudflare Workers.

- Deploy the public React Router website as a Worker.
- Deploy Payload CMS as a separate Worker.
- Deploy the maintenance application as a separate Worker with no dependency on the website, CMS, or relational database.
- Build the website and CMS from the same repository revision and release them through one coordinated deployment.
- Use Cloudflare routing to direct application traffic to the maintenance Worker during deployment and recovery operations.
- Use Cloudflare's response cache for the eligible final page responses defined by the website-delivery design.
- Keep durable state outside Worker instances. D1 owns relational persistence, while R2 owns uploaded media.
- Execute migrations, coordinated recovery, and other long-running operational work through GitHub Actions rather than request-serving Workers, including retrieval and restoration of D1 Time Travel bookmarks.
- Treat edge execution as one delivery property, not as a guarantee of low end-to-end latency. Verify cached and uncached performance independently.

Exact Worker configuration, compatibility flags, resource bindings, routing rules, cache rules, and deployment commands remain implementation details governed by the technical design and deployment configuration.

## Alternatives considered

### Deploy conventional Node.js applications in one region

A virtual server, managed Node.js host, or container platform could run the website and CMS in a conventional environment near the primary database. This would provide the broadest Node.js compatibility, make local and production execution more similar, and potentially reduce CMS-to-database latency.

It was not selected because it would require more server or container operation, would integrate less directly with the selected Cloudflare delivery facilities, and would not demonstrate the intended edge-runtime hosting model. It remains a credible option if Worker constraints become disproportionate.

### Use a regional serverless application platform

A regional functions or application platform could retain managed scaling and deployment without requiring a conventional server. It might provide a more complete Node.js runtime and simpler compatibility with Payload while keeping the application close to a conventional regional database.

It was not selected because the project would still use Cloudflare for caching, routing, and R2, creating a split operational boundary without a current requirement for it. It would also provide less direct experience with the selected edge runtime.

### Prebuild the public website and host only dynamic capabilities at runtime

Most portfolio content changes infrequently and could be generated during publishing or deployment. Static output could provide excellent public performance and reduce runtime dependencies, while the CMS, previews, forms, and AI search remain separately hosted.

It was not selected because the accepted design uses server-rendered website routes, runtime CMS retrieval, previews, CMS-defined error templates, forms, and AI search. The project also intends to demonstrate a server-side edge application rather than reduce the public website to static hosting. Static generation remains a possible future optimization if the runtime design no longer provides sufficient value.

### Select hosting and persistence as one Cloudflare-native stack

The project could treat Workers, R2, and a Cloudflare-native relational database as one combined platform decision. Edge-replicated reads could improve some uncached request paths and reduce the number of infrastructure providers.

It was not selected as part of this ADR because hosting and relational storage have different requirements and consequences. A native database would not eliminate the need for caching or make every dynamic request local, while database compatibility, consistency, migrations, backups, and AI-search storage require their own evaluation. [ADR 0005](0005-use-cloudflare-d1-for-relational-storage.md) records the relational-storage choice.

## Consequences

Positive consequences:

- The portfolio demonstrates a modern managed hosting platform and an edge-runtime deployment using real server-side applications.
- Public requests can enter the application through Cloudflare's distributed network.
- Eligible complete page responses can be cached and served near visitors without executing the full application path.
- The application does not require server provisioning, patching, or capacity planning for individual regions.
- Workers integrates directly with Cloudflare routing, caching, R2 bindings, configuration, and traffic controls.
- The maintenance application can remain available independently from the website, CMS, and database during planned deployment and recovery operations.
- Long-running operational work has an explicit boundary outside request-serving applications.

Negative consequences:

- Worker runtime constraints can make Node.js packages, Payload capabilities, framework adapters, or diagnostic tooling harder to use.
- The project becomes coupled to Cloudflare's runtime APIs, bindings, routing, cache configuration, deployment tooling, limits, and pricing.
- Cloudflare hosts several application and operational capabilities, increasing the impact of a provider-wide outage, account problem, or configuration error.
- Edge execution does not remove website-to-CMS calls or database latency. Uncached and dynamic requests may still cross regions and can be slower than their edge entry point suggests.
- Performance depends on cache correctness and effectiveness as well as application and database behaviour; the hosting platform does not make the system fast automatically.
- Local development requires Worker-runtime emulation and deployed-environment verification.
- Moving to a conventional Node.js or another edge platform would require runtime, deployment, binding, caching, and routing changes.

The platform integration, managed operation, delivery model, and demonstration value are considered sufficient to accept these constraints for the portfolio.

## Revisit conditions

Revisit this decision if:

- Payload, React Router Framework, or another required dependency no longer supports the Worker runtime reliably.
- Worker resource, execution, compatibility, observability, or debugging constraints materially prevent required behaviour.
- Measured uncached latency is unacceptable and cannot be corrected through caching, query design, service placement, or the separately selected data architecture.
- The website becomes predominantly build-time static and its remaining dynamic endpoints are better served through a smaller runtime boundary.
- Cloudflare incidents, account risk, pricing, or service concentration no longer fit the portfolio's availability and operating requirements.
- A regional deployment close to the primary database produces materially better end-to-end behaviour with acceptable operational cost.
- The portfolio no longer aims to demonstrate edge-runtime and modern managed-hosting knowledge.

## Related documentation

- [Architecture overview](../architecture-overview.md)
- [Website delivery](../website-delivery.md)
- [Development and operations](../development-and-operations.md)
- [Quality and safety](../quality-and-safety.md)
- [Risks and deferrals](../risks-and-deferrals.md)
- [Functional public website](../../functional/public-website.md)
- [Functional content management](../../functional/content-management.md)
- [ADR 0001: Separate the CMS and public website](0001-separate-cms-and-public-website.md)
- [ADR 0002: Use Payload CMS](0002-use-payload-cms.md)
- [ADR 0003: Use React Router Framework](0003-use-react-router-framework.md)
- [ADR 0005: Use Cloudflare D1 for relational storage](0005-use-cloudflare-d1-for-relational-storage.md)
- [ADR 0006: Use Cloudflare R2 for object storage](0006-use-cloudflare-r2-for-object-storage.md)
- [ADR 0007: Use tRPC for website-to-CMS data access](0007-use-trpc-for-website-to-cms-data-access.md)
- [ADR 0008: Use Cloudflare CDN caching with targeted publication invalidation](0008-use-cloudflare-cdn-caching-with-targeted-publication-invalidation.md)

[Back to architecture decision records](README.md)
