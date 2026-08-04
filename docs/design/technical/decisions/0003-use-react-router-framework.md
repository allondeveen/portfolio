# ADR 0003: Use React Router Framework

> **Status: Accepted**
>
> **Decision state:** React Router Framework is used for the public website's routing, request handling, and rendering.

## Context

The public website is a separate application from Payload CMS. It must turn visitor-facing routes into rendered responses, retrieve content through the CMS service boundary, handle form and AI requests, produce metadata and error responses, and selectively add client-side behaviour. The framework should support these responsibilities without taking ownership of content administration, persistence, or the website-to-CMS contract.

The portfolio is also intended to demonstrate current full-stack React skills. Remix was initially considered for this purpose, but Remix v2 entered maintenance mode and the project no longer recommends it for new applications. The React-compatible framework capabilities developed through Remix were incorporated into React Router v7 as Framework Mode, which is the recommended continuation of that model. React Router Framework therefore demonstrates the relevant route-module, data-loading, request-handling, and rendering skills without starting a new application on the maintenance-mode framework.

### 1. Fit with route-oriented website behaviour

The website has distinct route-level responsibilities for the homepage, collection overviews, public content, previews, form submissions, search, and AI requests. React Router's Route Module API provides a concise contract in which request loading or mutation, rendering, metadata, error handling, and other route-specific behaviour can be defined around the route that owns it.

This model fits the portfolio's route-oriented delivery design and keeps route-specific logic close to its public entry point. It is a useful structural match rather than a unique use-case requirement; the same behaviour could be implemented with another server-capable web framework.

### 2. Type-safe route contracts

Framework Mode provides type-safe `href` generation and generates route-module types for parameters, loader data, actions, and other route APIs. This reduces duplication between route declarations and their implementations and makes invalid route parameters or links easier to detect during development.

The generated types complement the typed tRPC boundary but do not replace it. React Router owns the website-side route contract, while tRPC separately owns calls from the website to the CMS.

### 3. Rendering flexibility

React Router Framework supports single-page application, server-side rendering, and static pre-rendering strategies. This keeps multiple delivery strategies available without replacing the routing model or adopting a different framework.

The availability of these strategies does not by itself guarantee better performance. The selected design uses server rendering for visitor-facing page responses, with Cloudflare caching the eligible final responses. Most content blocks produce static output without client hydration, while the AI-search interface remains client-side and dynamic. Static pre-rendering or broader SPA behaviour may be used only where the delivery design and measured performance justify them.

### 4. Focused framework scope

React Router Framework provides the routing, data-loading, mutation, rendering, error-handling, code-splitting, and build conventions needed by the public website while retaining a comparatively focused framework surface. It does not require the website to adopt a broader application platform containing persistence, content management, or other product facilities already owned elsewhere in the architecture.

Framework Mode is deliberately more opinionated than using React Router only as a library. That bounded set of conventions is preferred here because it supplies the full-stack route model the portfolio is intended to demonstrate without requiring the project to assemble that model itself.

## Decision

Use React Router in Framework Mode for the public website.

- React Router route configuration defines the visitor-facing website routes and their precedence.
- Route modules own route-specific loading or mutation, response construction, metadata, and error handling where applicable.
- Server-side route logic calls the CMS service boundary and maps the returned content into the shared website renderer.
- Eligible public page responses are server rendered before Cloudflare applies the caching policy defined by the delivery design.
- Static content blocks do not require client hydration; client-side behaviour is added only for dynamic features such as the AI-search interface.
- Generated route-module types and type-safe `href` generation are used to keep route declarations, links, parameters, and route data aligned.
- React Router does not own CMS persistence, content modelling, downstream service contracts, cache policy, or deployment topology. Those responsibilities remain with their respective design documents and ADRs.

Exact route-module composition, loader and action implementation, component boundaries, and rendering optimizations remain implementation details governed by [Website delivery](../website-delivery.md).

## Alternatives considered

### Use Remix v2

Remix directly provides the route-module and full-stack React model that the portfolio originally intended to demonstrate. It would satisfy the website's routing and server-rendering needs.

It was not selected because Remix v2 is in maintenance mode and is no longer recommended for new applications. Starting with React Router Framework follows the maintained React-compatible continuation of the same framework model rather than beginning with an additional migration already expected.

### Use React Router in Data or Declarative Mode

Using React Router as a library would retain its routing APIs while allowing the project to choose its own build, server-rendering, data-loading, and application conventions. This would reduce coupling to Framework Mode's Vite plugin and generated route-module structure.

It was not selected because the project would need to assemble more of the full-stack framework behaviour itself. That would work against the objective of demonstrating the cohesive Remix-derived framework model and would add bespoke integration without a use-case requirement for that control.

### Use a broader full-stack React framework

A broader React framework could also provide file-based routing, server rendering, data loading, code splitting, and production build tooling, potentially with additional built-in backend and deployment facilities.

It was not selected because those additional facilities overlap with responsibilities already assigned to Payload, tRPC, Cloudflare, and the separate service architecture. React Router Framework offers a more focused route and rendering layer for the selected boundary.

### Build a predominantly static website with a smaller routing layer

A static-site-oriented implementation could prebuild much of a portfolio and use a smaller client or server routing layer. It could reduce runtime work for content that changes infrequently.

It was not selected because the website includes authenticated downstream content retrieval, previews, forms, agentic search, CMS-defined error templates, and coordinated runtime behaviour. React Router Framework provides one route model for both the static-looking content and these dynamic request paths.

## Consequences

Positive consequences:

- The project demonstrates the actively developed successor to Remix's React-compatible framework model.
- Route-specific loading, rendering, metadata, mutation, and failure behaviour have a consistent organizational boundary.
- Route parameters, loader data, actions, and generated links can participate in the framework's type generation.
- Server rendering, static pre-rendering, and SPA strategies remain available without replacing the routing system.
- Automatic route-level code splitting and selective client-side behaviour support the website's performance goals.
- The public framework remains focused on delivery concerns and does not duplicate CMS or persistence responsibilities.

Negative consequences:

- The website becomes coupled to React Router's Route Module API, route type generation, Vite integration, and framework lifecycle.
- Framework upgrades can require changes to route conventions, generated types, adapters, or server integration.
- Supporting several rendering strategies introduces choices that still require measurement, configuration, and testing; the framework does not make the site fast automatically.
- Cloudflare Worker integration, CMS authentication, tRPC calls, cache behaviour, and the shared content-block renderer still require project-specific implementation.
- Framework Mode includes more build and application convention than React Router's library modes, even though its product scope is narrower than a broader application platform.

The route-level consistency, type safety, rendering options, and demonstration value are considered sufficient to accept this framework coupling.

## Revisit conditions

Revisit this decision if:

- React Router Framework no longer supports the required Cloudflare Worker runtime or server-rendering boundary.
- Its route-module or build conventions repeatedly conflict with the website's delivery requirements.
- Type generation, framework upgrades, or adapter maintenance become disproportionate to the value they provide.
- The website becomes predominantly build-time static and its dynamic endpoints are better served separately by a materially smaller delivery layer.
- The application requires framework capabilities that would otherwise need substantial custom infrastructure around React Router.
- The portfolio no longer aims to demonstrate the Remix-derived full-stack React route model.

## Related documentation

- [Architecture overview](../architecture-overview.md)
- [Website delivery](../website-delivery.md)
- [Quality and safety](../quality-and-safety.md)
- [Functional public website](../../functional/public-website.md)
- [Functional navigation](../../functional/navigation.md)
- [Functional forms](../../functional/forms.md)
- [ADR 0001: Separate the CMS and public website](0001-separate-cms-and-public-website.md)
- [ADR 0004: Deploy on Cloudflare Workers](0004-deploy-on-cloudflare-workers.md)
- [ADR 0007: Use tRPC for website-to-CMS data access](0007-use-trpc-for-website-to-cms-data-access.md)
- [ADR 0009: Use Turso-backed RAG for AI search](0009-use-turso-backed-rag-for-ai-search.md)

[Back to architecture decision records](README.md)
