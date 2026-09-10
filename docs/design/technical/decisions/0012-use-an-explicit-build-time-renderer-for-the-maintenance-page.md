# ADR 0012: Use an explicit build-time renderer for the maintenance page

> **Status: Accepted**
>
> **Date:** 2026-09-10
>
> **Decision state:** The maintenance page is rendered by a project-owned Vite build step that explicitly establishes its Cloudflare service-binding environment, retrieves CMS content, and generates the static page before the maintenance Worker is deployed.

## Context

The maintenance application must serve a CMS-managed page while the public website and CMS are being deployed, migrated, rolled back, or recovered. Its deployed response must therefore remain independent of both application Workers and the relational database. The content may be retrieved while building the maintenance application, but the deployed Worker must not retrieve that content while handling visitor requests.

React Router Framework was initially used for the maintenance application because it supports route loaders and build-time prerendering. The maintenance route loader retrieved its content from the CMS through an authenticated Cloudflare service binding. Framework prerendering invoked the loader during the React Router build, but the selected React Router Framework and Cloudflare integration did not establish that service binding in the prerender environment. The loader consequently could not rely on `env.CMS`, even though the same binding was available to the deployed Worker.

Supplying Cloudflare account credentials to the build did not by itself provide the missing framework build-time binding. Retrieving content through the public CMS hostname was also unsuitable: Cloudflare Access or maintenance routing could prevent that request from reaching the CMS, and the architecture already defines a private service-binding path for application-to-application communication.

The maintenance build therefore needs explicit control over when the CMS connection is established, which CMS deployment it targets, when content retrieval occurs, and when static rendering begins. This requirement is specific to the maintenance build. It does not change React Router Framework's ownership of public website routing and rendering under [ADR 0003](0003-use-react-router-framework.md).

## Decision

Use a project-owned build-time rendering pipeline for the maintenance page instead of React Router Framework prerendering.

- A Node.js build step explicitly creates the Cloudflare platform environment through Wrangler before retrieving content.
- Development uses the local CMS service binding and may wait briefly for the local CMS process to become available.
- Staging and production builds use the configured remote CMS service binding.
- The build authenticates to the CMS through the typed tRPC service boundary and retrieves the maintenance-page content before rendering begins.
- Vite compiles a server-side rendering module, React renders the page to HTML, and the build embeds the rendered markup and emitted stylesheet in `index.html`.
- The retrieved content is embedded for optional hydration; the deployed page does not fetch content from the CMS.
- The maintenance Worker serves the generated static asset while maintenance mode is active and otherwise dispatches requests to the CMS or website Worker according to the request host.
- A failure to establish the service binding, authenticate, retrieve valid content, or render the page fails the build rather than publishing stale or empty output.
- Saving the maintenance content may trigger a separate maintenance build and deployment so that the generated page reflects the latest accepted content.

The custom pipeline owns only the maintenance page's build-time content retrieval and static rendering. It does not replace React Router Framework for the public website, change the tRPC service contract, or introduce a runtime dependency from the maintenance response to the CMS.

## Alternatives considered

### Use React Router Framework prerendering

React Router Framework can execute route loaders during prerendering and generate static route output. Retaining it would provide standard route modules, generated route types, and framework-owned rendering.

It was not selected because the framework prerender phase did not establish the Cloudflare service binding required by the maintenance loader. The resulting build depended on an environment capability that was present at Worker runtime but absent when prerendering occurred. The maintenance application contains one catch-all page and does not otherwise need the framework's routing and server-runtime facilities.

### Retrieve content through the public CMS hostname during prerendering

The build could call the CMS over its public hostname without requiring a Worker service binding in the prerender environment.

It was not selected because the public hostname can be protected by Cloudflare Access or intercepted by maintenance routing. It would also bypass the service-binding path selected for internal communication and make the build depend on public routing configuration.

### Retrieve CMS content at request time

The maintenance Worker could render or load the page dynamically for each visitor request. This would keep the page current without a separate content-triggered build.

It was not selected because maintenance mode must remain useful while the CMS, website, or database is unavailable. A runtime CMS dependency would make the fallback depend on a component whose deployment or failure it is intended to isolate.

### Store maintenance content separately and render it at request time

CMS hooks or the deployment pipeline could copy normalized maintenance content into KV or another store read by the maintenance Worker.

It was not selected because it would introduce another persisted representation, synchronization process, validation boundary, and request-time failure mode. The generated static page already provides the required small, independently deployable fallback.

### Use a fixed maintenance page without CMS-managed content

A hand-written static page would remove build-time CMS access and provide the smallest possible fallback.

It was not selected because maintenance content is intentionally managed through the CMS and uses the shared content-block presentation. The explicit build pipeline preserves that editorial capability without creating a runtime CMS dependency.

## Consequences

Positive consequences:

- The build controls Cloudflare service-binding initialization instead of depending on framework prerender behaviour.
- Local builds can wait for the CMS, while remote builds can target the already deployed CMS Worker explicitly.
- The deployed maintenance response remains available without the CMS, website, or relational database.
- Visitor requests do not incur CMS authentication, content retrieval, or server rendering.
- The maintenance Worker contains only the routing logic and static assets needed for its operational role.
- Content retrieval, validation, rendering, and deployment fail at explicit stages that can be diagnosed independently.

Negative consequences:

- The project owns rendering, HTML injection, stylesheet collection, content serialization, development refresh, and associated validation that a framework would otherwise provide.
- Changes to Vite, React server rendering, Vanilla Extract output, or Cloudflare's development tooling can require maintenance of the custom pipeline.
- Maintenance-content changes require a successful build and deployment before they become visible.
- A staging or production build still requires a reachable deployed CMS Worker and valid build credentials; static rendering removes the runtime dependency but not the build-time dependency.
- The maintenance application does not receive React Router Framework's route conventions, generated route types, or error-boundary behaviour.

The explicit build-time environment and runtime isolation are considered sufficient to accept this additional build implementation for the single-page maintenance application.

## Validation

The decision is validated when:

- A development build waits for and retrieves content through the local CMS service binding.
- Staging and production builds retrieve content through the corresponding remote CMS service binding without using the public CMS route.
- Missing bindings, credentials, unavailable CMS responses, invalid content, or invalid renderer output fail the build.
- The generated HTML contains the rendered maintenance content and styling before deployment.
- The deployed maintenance page can be served while the CMS and website Workers are unavailable.
- The deployed maintenance response performs no CMS or database request.

## Revisit conditions

Revisit this decision if:

- React Router Framework's Cloudflare integration reliably provides configured service bindings during prerendering.
- The maintenance application grows enough routing or interactive behaviour that maintaining a separate rendering pipeline costs more than adopting a framework.
- Maintenance content no longer needs to be managed through the CMS.
- A supported Cloudflare-native static generation mechanism provides the same authenticated service-binding access and deployment ordering with less project-owned code.
- The build-time CMS dependency repeatedly prevents maintenance-page deployment or recovery.
- The custom Vite, rendering, or development-refresh implementation becomes disproportionate to the isolation it provides.

## Related documentation

- [Maintenance mode setup](../../../setup/maintenance-mode.md)
- [Architecture overview](../architecture-overview.md)
- [Website delivery](../website-delivery.md)
- [Development and operations](../development-and-operations.md)
- [Quality and safety](../quality-and-safety.md)
- [ADR 0003: Use React Router Framework](0003-use-react-router-framework.md)
- [ADR 0004: Deploy on Cloudflare Workers](0004-deploy-on-cloudflare-workers.md)
- [ADR 0007: Use tRPC for website-to-CMS data access](0007-use-trpc-for-website-to-cms-data-access.md)

[Back to architecture decision records](README.md)
