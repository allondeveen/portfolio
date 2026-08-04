# ADR 0001: Separate the CMS and public website

> **Status: Accepted**
>
> **Decision state:** The CMS and public website are separate applications and deployment units within one coordinated product release.

## Context

The portfolio requires content management and a public website, but its functional requirements do not require those capabilities to run as separate applications. A single application could provide both and would be simpler. The separation is a deliberate architectural choice whose primary value is the technical breadth demonstrated by the portfolio, with several general architectural benefits supporting it.

### 1. Demonstration objective

The portfolio is both a working website and a demonstration of engineering knowledge. A separate public application creates a meaningful setting in which to demonstrate:

- React Router Framework as the owner of public routing and rendering
- A typed service boundary between the public website and the CMS
- Server-to-server communication and authentication
- Distributed request, failure, caching, and deployment behaviour
- Application of HTTP, OAuth, JWT, CSP, caching, and other web standards

This is the primary reason for accepting the additional complexity. The separation is not justified retroactively as a response to scale or organisational requirements that the project does not have.

The architecture demonstrates service boundaries and distributed-application concerns. It is not presented as an autonomous microservices architecture: the applications share a repository revision, are deployed as one coordinated release, and are not independently versioned.

### 2. Supporting architectural benefits

The separation gives the CMS and website clear ownership boundaries. Payload CMS owns content administration, persistence, editorial workflows, and the CMS-facing security boundary. The React Router website owns visitor-facing routing, presentation, rendering, caching behaviour, and interactive website endpoints.

This allows the public presentation to evolve without adopting Payload's rendering model. It also makes the website-to-CMS contract, the difference between public and privileged access, and the failure behaviour of a remote dependency explicit. Cloudflare can cache public page responses independently from CMS administration traffic.

These are useful properties, but none is considered sufficient by itself to make separation mandatory for this use case.

### 3. Absence of a use-case requirement

The project has one developer, a modest workload, and no requirement for independent team ownership, independent scaling, or independent release schedules. The CMS and website live in one monorepo, are built from the same revision, and are deployed together. A combined application could satisfy the functional requirements with fewer network, authentication, compatibility, and operational concerns.

The decision therefore accepts complexity for demonstration value and separation of concerns, not because the portfolio domain inherently requires multiple services.

## Decision

The CMS and public website are implemented as separate applications and deployed as separate Cloudflare Workers.

- Payload CMS owns content management, editorial workflows, persistence access, and the CMS service boundary.
- The React Router website owns public request handling, routing, rendering, and visitor-facing interactive endpoints.
- The website retrieves CMS-managed content and invokes CMS operations through an explicit authenticated service interface rather than reading the CMS database directly.
- Both applications remain in the same monorepo, are built from the same repository revision, and are deployed as one coordinated release.
- Separation does not imply independent versioning, deployment, scaling, or team ownership.

The choice of Payload CMS is recorded in [ADR 0002](0002-use-payload-cms.md), the choice of React Router Framework in [ADR 0003](0003-use-react-router-framework.md), the hosting decision in [ADR 0004](0004-deploy-on-cloudflare-workers.md), and the detailed website-to-CMS interaction in [ADR 0007](0007-use-trpc-for-website-to-cms-data-access.md).

## Alternatives considered

### One Payload application serving both the CMS and public website

This would satisfy the functional requirements with the least operational complexity. It would avoid a network boundary, service authentication, cross-application failure handling, and compatibility concerns.

It was not selected because public delivery would be coupled to the CMS application and the project would no longer provide a meaningful demonstration of an independent React Router application and service-to-service architecture.

### One deployable application with separate internal CMS and website modules

This would retain some separation of code and responsibility without introducing a remote service boundary. It would be easier to develop, deploy, and diagnose than two Workers.

It was not selected because it would not exercise the distributed communication, authentication, caching, and failure concerns that form part of the portfolio's demonstration objective.

### Independently versioned and deployed CMS and website services

This would provide stronger service autonomy and could allow independent release and scaling strategies.

It was not selected because the project has no use-case, organisational, or scaling requirement for that autonomy. It would add compatibility and operational work without contributing enough additional value beyond the selected separate-Worker boundary.

## Consequences

Positive consequences:

- The portfolio demonstrates an independent React Router application and an explicit typed service boundary.
- Public delivery and CMS administration have clear ownership and trust boundaries.
- Public routing, rendering, web standards, and caching can be designed independently from Payload's administration concerns.
- Remote-dependency authentication, failure handling, and observability become explicit parts of the architecture.

Negative consequences:

- Every CMS-dependent website request introduces a network call and an additional failure mode.
- The system requires service authentication, token handling, interface compatibility, error mapping, and distributed tracing.
- Development and deployment require coordination between two application Workers.
- The architecture contains more code and operational behaviour than the functional requirements alone justify.
- Because the applications are released together, the system accepts much of the complexity of distributed services without gaining full deployment autonomy.

The demonstration value and separation of responsibility are considered sufficient to accept these costs for this portfolio.

## Revisit conditions

Revisit this decision if:

- Demonstrating a distributed website-to-CMS boundary is no longer a project objective.
- The additional network, authentication, deployment, or debugging complexity materially prevents delivery of the portfolio's functional requirements.
- The CMS can own public rendering without compromising the desired React Router or web-standards demonstration.
- The website-to-CMS boundary becomes so tightly coupled that an in-process boundary would be materially simpler and more reliable.
- Independent scaling, release schedules, or team ownership become real requirements, in which case the coordinated-release constraint should also be reconsidered.

## Related documentation

- [Architecture overview](../architecture-overview.md)
- [Website delivery](../website-delivery.md)
- [Development and operations](../development-and-operations.md)
- [Functional public website](../../functional/public-website.md)
- [Functional content management](../../functional/content-management.md)
- [ADR 0002: Use Payload CMS](0002-use-payload-cms.md)
- [ADR 0003: Use React Router Framework](0003-use-react-router-framework.md)
- [ADR 0004: Deploy on Cloudflare Workers](0004-deploy-on-cloudflare-workers.md)
- [ADR 0007: Use tRPC for website-to-CMS data access](0007-use-trpc-for-website-to-cms-data-access.md)

[Back to architecture decision records](README.md)
