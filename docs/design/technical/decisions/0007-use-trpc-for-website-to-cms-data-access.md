# ADR 0007: Use tRPC for website-to-CMS data access

> **Status: Accepted**
>
> **Decision state:** Accepted. The integration contract, alternatives, consequences, and revisit conditions are complete.
>
> **Scope:** The complete website-to-CMS integration, including request ownership, tRPC procedures, content normalization, service authentication, authentication failures, and release compatibility.

## Context

The public website and Payload CMS are separate Cloudflare Workers under [ADR 0001](0001-separate-cms-and-public-website.md). The website owns visitor-facing routes and rendering, while the CMS owns content administration, editorial workflows, and access to CMS-managed persistence. The website must retrieve CMS-managed content, request previews, and forward form submissions without reading the CMS database directly.

This creates a remote service boundary even though both applications are developed in one monorepo, built from the same revision, and deployed as one coordinated release. The integration therefore needs an explicit request contract, type boundary, authorization mechanism, failure mapping, and compatibility policy.

Browsers do not need or receive access to the CMS service interface. Visitor requests terminate at the website, and the website performs CMS work from its server-side Worker. This makes the website the only service client currently represented by the integration.

## Decision drivers

### Demonstration goal

The project intentionally demonstrates tRPC in a realistic service-to-service integration. This includes separate Workers, a typed domain boundary, authentication, failure mapping, deadlines, and coordinated deployment rather than using tRPC only as an isolated example. The demonstration goal influences the choice but does not replace the architectural reasons below.

### Architectural fit

The website and CMS are both TypeScript applications, live in the same monorepo, share a CMS-agnostic domain model, and are built from the same repository revision. The service interface is private to the website and does not need to support browsers, third-party clients, or another implementation language.

tRPC provides end-to-end TypeScript inference for procedure inputs and outputs without requiring a separate interface-description language or client-generation workflow. Shared runtime schemas still validate data at the Worker boundary; compile-time inference alone is not treated as runtime validation.

### Boundary ownership

The CMS must remain the sole owner of Payload configuration, CMS data access, and Payload-to-domain mapping. Sharing or reconstructing the Payload configuration in the website Worker is not acceptable because it would couple the website deployment to CMS collections, plugins, persistence configuration, and other CMS infrastructure. The selected boundary allows the website to depend only on the shared domain contract and tRPC client types.

## Decision

### Integration ownership and request flow

- The website is the only application that calls the CMS service interface.
- Browsers call visitor-facing website endpoints and never call the protected CMS tRPC procedures directly.
- The website does not read the D1 CMS database directly.
- The CMS exposes a custom tRPC interface for content retrieval, preview retrieval, and form submission.
- The website uses a short-lived access token obtained by its Worker through the Client Credentials flow. It requests a token when none is available or replaces one after the CMS rejects it as expired.
- The website presents that access token to every protected tRPC call made during the request pipeline.
- `POST /api/ai` is a website-owned endpoint and not a CMS tRPC procedure. Its vector access and model integration belong to [ADR 0009](0009-use-turso-backed-rag-for-ai-search.md).

### Domain model and ownership

The normalized integration representation is defined by a CMS-agnostic domain model in a shared monorepo package. That model is the source of truth for the content representation and content-block types that cross the website-to-CMS boundary. It does not depend on Payload collections, generated persistence types, or website components.

Payload's collection and field types remain internal to the CMS. The CMS owns the adapters that map Payload data, relationships, and blocks into the shared domain model. It also owns the tRPC router and the behaviour of its procedures, including content resolution, eligibility, and normalization.

The tRPC procedures return a serializable representation of the shared domain model rather than exposing Payload records. Shared boundary schemas provide the corresponding types and runtime validation. If the domain model later contains non-serializable behaviour, the boundary uses a serializable domain DTO derived from it rather than transmitting framework-specific objects.

The website consumes only the shared domain representation and owns the domain-to-component rendering. It does not interpret Payload models or maintain a separate definition of the normalized content contract.

### Website route mapping

The website routes use the CMS procedures as follows:

| Website request | CMS procedure | Integration purpose |
| --- | --- | --- |
| `GET /` | `content` | Retrieve the homepage together with the header, footer, not-found, and error-page templates |
| `GET /articles` | `content` | Retrieve the article overview, normalized topic-filter and pagination input, the requested page of article summaries, and the shared templates |
| `GET /projects` | `content` | Retrieve the project overview, normalized topic-filter and pagination input, the requested page of project summaries, and the shared templates |
| `GET /search` | `content` | Retrieve the Page assigned to the agentic-search route and the shared templates before the first prompt is submitted |
| `GET /*` | `content` | Resolve published content from the complete hierarchical and contextual path and retrieve it with the shared templates |
| `GET /preview/articles` | `previews` | Retrieve the article-overview preview, normalized topic-filter and pagination input, the requested page of article summaries, and the shared templates |
| `GET /preview/projects` | `previews` | Retrieve the project-overview preview, normalized topic-filter and pagination input, the requested page of project summaries, and the shared templates |
| `GET /preview/*` | `previews` | Resolve preview content from the complete hierarchical and contextual path beneath `/preview/` and retrieve it with the shared templates |
| `POST /forms/:id` | `form-submission` | Forward a form submission to the CMS |

The website forwards the request-specific one-time preview token and the information required to verify its website-URL binding to `previews`. The CMS procedure authoritatively validates and consumes that token while retrieving the preview, as defined by [ADR 0010](0010-use-single-use-tokens-for-shared-previews.md). The downstream tRPC call also uses the CMS access token defined here.

### Pagination transport

Collection-overview pagination is represented through search parameters on the visitor-facing website URL. This applies to normal collection overviews such as `GET /articles` and `GET /projects` and to their preview equivalents beneath `/preview/`.

The only visitor-controlled pagination parameter is `page`. Page indexes are one-based and default to `1` when the parameter is absent. The website omits `page` when generating a URL for the first page so the canonical first-page URL does not contain `page=1`.

The website owns parsing the search parameter into the structured pagination input passed to the appropriate tRPC procedure. It also supplies the item count per page as procedure input, but visitors cannot customize that value through the URL or other frontend input.

The CMS procedure receives the requested page index and item count per page and performs the actual pagination. Negative and out-of-range page indexes are normalized to `0` as part of that procedure. Its result includes the total item count, total page count, and current page. The procedure does not receive or interpret the complete visitor URL solely to determine pagination.

### Collection filtering

Article and project overviews use the repeated `topics` search parameter for filtering. Each value identifies a topic by its stable ID. Projects use the same parameter because a project technology is represented by a topic; the website-to-CMS contract does not introduce a separate technology filter.

Multiple selections are represented by repeating the parameter, for example `?topics=topic-a&topics=topic-b`. The website parses the repeated values into structured filter input for the appropriate tRPC procedure. Invalid values are ignored during parsing, and the CMS ignores IDs that do not identify an existing topic.

The CMS applies the topic-matching rules defined by [Content and publishing](../content-and-publishing.md), including descendant matching for parent topics and increased specificity for multiple topics. Filtering is applied before pagination. The returned total item count, total page count, current page, and page contents are therefore calculated from the filtered result set.

### Relationship resolution

The CMS resolves relationships required by the domain representation to a maximum depth of two. Related public content, including related projects, related articles, and article references, is mapped only to its hero data and public URL.

Related-content summaries do not include their own related-content relationships. Relationship expansion therefore stops at the summary rather than recursively traversing the content graph. The Payload query and adapter mechanics used to produce this representation remain implementation details.

### Content eligibility

[Content and publishing](../content-and-publishing.md) owns the publication lifecycle and is the source of truth for whether content is published. The `content` procedure returns only the current published revision of content in a public collection. Draft and unpublished content is not publicly retrievable; scheduled content becomes eligible only after publication has occurred.

Collection overviews and related-content results omit draft and unpublished items. When requested content exists in the CMS but is not publicly eligible, `content` represents it in the same way as content that does not exist and does not disclose its existence to the website or visitor.

The `previews` procedure may return the unpublished revision and referenced unpublished content authorized by the request-specific one-time preview token. The procedure validates and consumes that token authoritatively in the same successful retrieval operation. Preview authorization, token scope, and invalid-preview behaviour are defined by [ADR 0010](0010-use-single-use-tokens-for-shared-previews.md).

### Application-level procedure outcomes

The CMS procedures return stable outcome categories that allow the website to apply the following visitor-facing behaviour. Their exact tRPC error shape remains an implementation detail.

| Condition | Visitor-facing website behaviour |
| --- | --- |
| Requested content does not exist or is not publicly eligible | HTTP `404 Not Found` and the not-found page |
| The contextual content path is malformed | HTTP `404 Not Found` and the not-found page |
| The website sends invalid procedure input | HTTP `500 Internal Server Error` and the error page, because the shared integration contract has been violated |
| The requested form does not exist | HTTP `404 Not Found` and the not-found page |
| The form exists but its current state prevents submission | HTTP `409 Conflict` and the error page |
| A form submission fails validation | HTTP `400 Bad Request`; retain the current page content and display the returned form-validation errors |
| The website's runtime configuration is invalid | HTTP `500 Internal Server Error` and the error page |
| CMS authentication fails after the expired-token recovery path, or the CMS is otherwise unavailable | HTTP `503 Service Unavailable` and the error page |
| Any other unclassified application conflict or failure | HTTP `500 Internal Server Error` and the error page |

If invalid CMS configuration prevents the website from using the CMS, the website treats that downstream condition as CMS unavailability and returns `503`. The CMS itself returns `500` and displays its error page when serving a request with invalid local configuration.

### Logging and trace correlation

Every log entry created by the website, token endpoint, and CMS procedure for the same request pipeline must be recorded in the context of the same trace and be correlatable through its trace identifier, as required by [Quality and safety](../quality-and-safety.md). The tracing provider, propagation mechanism, headers, span construction, and logging integration are implementation details.

### tRPC procedure surface

The custom CMS tRPC interface provides three protected procedures:

- `content` retrieves the homepage, collection overviews, the Page assigned to the agentic-search route, and published content from every public collection.
- `previews` retrieves collection-overview previews and preview content from every public collection.
- `form-submission` accepts a form submission from the website.

The `content` procedure accepts the requested path and, for collection overviews, normalized topic-filter and pagination input. The `previews` procedure accepts the equivalent contextual path, topic-filter input, and pagination input beneath the preview namespace together with the one-time preview token and the URL-binding information required by ADR 0010. A complete contextual path can contain hierarchical page segments or a collection context such as `articles/:slug` or `projects/:slug`.

The CMS interprets the path, resolves the originating public collection, and uses its adapters to normalize the result to the shared domain representation. The response includes the requested content together with the header, footer, not-found, and error-page templates. Collection identity does not select a separate website renderer; every public collection uses the shared content-block contract.

Exact tRPC input and output schemas, serializer configuration, router composition, and query construction remain implementation details. This ADR defines the architectural contract and its required guarantees, not the complete implementation schema.

### Deadlines and cancellation

The website applies the following maximum timeout to each downstream operation:

| Operation | Maximum timeout |
| --- | ---: |
| One token exchange | 2 seconds |
| Initial procedure call with the available access token | 2 seconds |
| `content` or `previews` procedure | 5 seconds |
| `form-submission` procedure | 10 seconds |

A request pipeline with an available access token calls the request-specific procedure directly. If the procedure rejects that token specifically because it has expired, the website may obtain one replacement token and call the procedure once more. The initial procedure attempt is limited to 2 seconds; the replacement token exchange uses its 2-second timeout; and the repeated procedure call receives the full request-specific timeout. If the Worker has no available access token, the pipeline obtains one and then makes one procedure call with the full request-specific timeout.

The resulting maximum pipeline deadline is 9 seconds for content and preview requests and 14 seconds for form submissions. Every operation consumes the original pipeline budget and does not restart its clock.

When an operation or pipeline reaches its deadline, the website aborts the outstanding downstream request, returns HTTP `503 Service Unavailable`, renders the error page or its independent fallback, and prevents the response from being cached. The timeout is logged in the active trace.

If the visitor request is cancelled or the pipeline deadline expires, the website propagates cancellation to outstanding token or CMS procedure requests where the runtime permits it.

The expired-token path is authentication recovery rather than a general retry mechanism. It is the only condition under which the website repeats a procedure call. Token-exchange failures, procedure timeouts, dependency failures, and every other procedure error follow the defined failure path immediately and are not retried automatically.

The CMS validates the access token before executing procedure logic or causing side effects. An expired-token response therefore guarantees that the procedure, including `form-submission`, has not been executed and that repeating it with the replacement token is safe. Any broader retry mechanism requires a later revision of this decision and an explicit idempotency design for operations that can cause side effects.

### Authorization service

The CMS acts as the authorization server for the website-to-CMS boundary. It exposes `POST /oauth/token/` as a conventional HTTP endpoint rather than a tRPC procedure.

The website uses the Client Credentials flow:

1. The website sends its configured client credentials, the `client_credentials` grant type, and the `website-downstream` scope to `POST /oauth/token/`.
2. The CMS validates the submitted credentials against its own configured credentials.
3. The CMS issues a signed JWT access token that is valid for five minutes.
4. The website presents the token to the protected tRPC procedures used by that request pipeline.

The OAuth client credentials are generated externally and supplied independently to the website and CMS through server-only environment variables or hosting-provided configuration. They are never stored in source code, never exposed to browsers, and never exchanged between developers. The CMS does not implement client creation or maintain a client registry; it compares the request credentials with its configured credentials. The credentials are rotated manually in both deployments.

Each Worker obtains its own access token and never reuses one obtained by another Worker instance. An available token may be used for protected tRPC calls until the CMS rejects it as expired. A request pipeline may obtain one replacement token only through the expired-token recovery path.

### JWT contract

The CMS signs access tokens with HS256 using `jose`. Verification explicitly accepts only HS256 and rejects every other algorithm rather than selecting an algorithm from the untrusted token header.

The signing key is a cryptographically random 256-bit symmetric key. It is generated externally, supplied to the CMS through server-only environment variables or hosting-provided configuration, kept outside source code, and rotated manually.

The access-token claims use the following contract:

| Claim | Required value |
| --- | --- |
| `iss` | The configured canonical CMS origin for the current environment |
| `aud` | The canonical CMS origin with `/trpc` appended |
| `iat` | The NumericDate at which the token is issued |
| `exp` | Exactly 300 seconds after `iat` |
| `nbf` | Omitted because the token is valid immediately |
| `scope` | `website-downstream` |

Issuer and audience comparisons are exact and case-sensitive. The CMS permits a maximum thirty-second clock-skew tolerance when validating time-based claims and rejects a token whose `iat` is more than thirty seconds in the future.

Every protected tRPC procedure validates the token signature, expiry, issuer, audience, and fixed `website-downstream` scope.

Issued access tokens cannot be individually revoked and remain valid until their five-minute expiry. Rotating the OAuth client credentials prevents new tokens from being issued with the old credentials but does not invalidate an access token that has already been issued. Rotating the JWT signing key makes tokens signed with the previous key fail validation.

### Authentication failure responses

The token endpoint and protected tRPC interface use the following responses:

| Boundary and condition | Response |
| --- | --- |
| `/oauth/token/` receives a malformed or incomplete request body | HTTP `400` with `{"error":"invalid_request"}` |
| `/oauth/token/` receives a grant type other than `client_credentials` | HTTP `400` with `{"error":"unsupported_grant_type"}` |
| `/oauth/token/` receives a scope other than `website-downstream` | HTTP `400` with `{"error":"invalid_scope"}` |
| `/oauth/token/` receives missing or incorrect client credentials | HTTP `401` with `{"error":"invalid_client"}` |
| `/oauth/token/` receives a method other than `POST` | HTTP `405` with `Allow: POST` |
| A protected tRPC procedure receives no access token | tRPC `UNAUTHORIZED` and HTTP `401` with `WWW-Authenticate: Bearer` |
| A protected tRPC procedure receives an expired token | tRPC `UNAUTHORIZED` and HTTP `401` with `WWW-Authenticate: Bearer error="invalid_token"`, together with the stable machine-readable expiry classification used by the website's authentication-recovery path |
| A protected tRPC procedure receives a malformed, incorrectly signed, or otherwise invalid token, including a token with the wrong issuer or audience | tRPC `UNAUTHORIZED` and HTTP `401` with `WWW-Authenticate: Bearer error="invalid_token"` |
| A protected tRPC procedure receives an otherwise valid token without the `website-downstream` scope | tRPC `FORBIDDEN` and HTTP `403` with `WWW-Authenticate: Bearer error="insufficient_scope", scope="website-downstream"` |

All token-endpoint responses use JSON and include `Cache-Control: no-store`. Detailed token-validation failures are logged internally and represented externally only as `invalid_token`, except for the stable expiry classification required by the service-to-service authentication-recovery path. That classification is not shown to visitors.

When a visitor-facing website endpoint cannot obtain an access token or the CMS rejects its access token, the website treats the CMS dependency as unavailable. It returns HTTP `503 Service Unavailable`, renders the error page or independent fallback defined by Website Delivery, and does not cache the response. The visitor is not shown an authentication error because the visitor is not the failing service principal.

Preview-token failures do not use this JWT failure contract. An expired, invalid, already-used, or mismatched preview token limits the result to publicly eligible content under ADR 0010 rather than representing a failure of the website service principal. AI-search visitor authentication is also outside this integration and belongs to ADR 0009.

### Deployment compatibility

The CMS and website live in one monorepo, are built from the same repository revision, and are deployed together as one coordinated release. They are not independently versioned or released.

Only the website and CMS built from the same repository revision are guaranteed to be compatible. A change to a procedure, its inputs, the shared domain representation, block types, or shared-template representation updates the shared package, CMS producer, and website consumer in the same change. The integration does not provide API versioning, deprecation windows, or backward- and forward-compatibility guarantees for independently released Worker versions.

Maintenance mode isolates public traffic while different Worker revisions might temporarily coexist during deployment. Release verification starts only after the required database migration and both Workers have been deployed. Maintenance mode is removed only after the coordinated release has passed its checks.

If either Worker or another release step fails, both Workers are rolled back to the preceding coordinated revision. When the failure occurs after migration processing begins, the automated recovery workflow uses the Time Travel bookmark stored immediately before migration to restore D1 to its pre-migration state in the same pipeline. The restored website, CMS, shared contract, and persisted state therefore return to the preceding coordinated version rather than requiring a newer contract to remain backward compatible with the restored applications.

## Related decisions and deferrals

Cache staleness and publication-driven invalidation belong to [ADR 0008](0008-use-cloudflare-cdn-caching-with-targeted-publication-invalidation.md). Form processing after the `form-submission` boundary is deferred separately. Preview-link security and unpublished-content authorization belong to ADR 0010.

## Alternatives considered

### Use Payload directly from the website Worker

Payload's Local API and generated collection types would provide good TypeScript support. Using them from the website Worker would, however, require the website to import or recreate Payload configuration and CMS infrastructure. It would also give the website direct CMS persistence access and weaken the ownership boundary established by the separate CMS Worker. This configuration and deployment coupling is unacceptable for the project.

### Access the CMS database directly

Direct access could share ORM types and avoid a request-time CMS service call. It would allow the website to bypass Payload's access rules, draft and publication lifecycle, relationship handling, and CMS-owned normalization. It would also couple website queries to the persistence schema. This conflicts with the CMS ownership boundary even if the database access itself is type-safe.

### Expose a conventional REST interface

REST would use widely understood web conventions and would be easier to consume from other languages. REST does not inherently provide the desired end-to-end TypeScript inference; equivalent compile-time safety would require an OpenAPI or similar contract plus generated clients, or manually synchronized types. That additional contract machinery is not justified for a private interface between two TypeScript applications in the same monorepo.

Using Payload's generated REST interface directly would additionally expose Payload-oriented records instead of the CMS-agnostic domain model unless another normalization boundary were added.

### Expose a GraphQL interface

GraphQL has a strongly typed schema and can produce type-safe TypeScript clients through code generation. It would introduce a separate schema, resolver and client-generation workflow, and a flexible client-selected query surface that this narrow integration does not require. Payload's generated GraphQL schema would also expose the Payload model rather than the selected domain representation unless a custom normalization layer were added.

### Push or prebuild content

Build-time or publication-driven content push could reduce the CMS as a request-time dependency and improve isolation for public content delivery. It would introduce a synchronization and invalidation pipeline, complicate immediate previews and publication behaviour, and would not remove the request-time boundary needed for form submissions. The current portfolio scope and demonstration goal do not justify that additional delivery architecture.

### Decision

The authenticated tRPC boundary is selected because it provides the desired end-to-end TypeScript inference with the least additional contract machinery for this same-language, same-repository integration. It preserves CMS ownership of Payload configuration and data access while allowing the CMS to return a normalized domain representation. GraphQL and REST can both be made type-safe, but their schema or code-generation workflows provide no compensating benefit for the current private interface.

## Known consequences

Positive consequences:

- The website cannot bypass Payload's content access and normalization boundary by querying CMS tables directly.
- tRPC provides end-to-end TypeScript inference without a separate interface-description or client-generation workflow.
- CMS-owned adapters can normalize different public collections without coupling the shared domain model or website renderer to Payload collection models.
- The CMS and website use one shared definition of the normalized domain representation and block types.
- Browsers receive neither CMS service credentials nor direct access to the protected procedures.
- Short-lived, scoped tokens limit the lifetime and purpose of downstream authorization.
- Authentication failures have an explicit service-level and visitor-facing representation.
- Expired access tokens can be recovered within the request pipeline without introducing general retries.

Negative consequences:

- Every uncached CMS-dependent website request includes one or more network calls and may include a token exchange.
- The system must implement and operate credentials, signing keys, token issuance, token validation, failure mapping, and manual rotation.
- tRPC and shared TypeScript types can create strong compile-time and release coupling between the Workers.
- The tRPC interface is optimized for TypeScript consumers and is less suitable than REST or GraphQL if clients in other languages are introduced.
- The CMS becomes a runtime dependency for uncached pages, previews, form submissions, and the initial search page.
- Token failures other than expiry and transient CMS failures are surfaced immediately because the website does not retry them automatically.
- A coordinated release reduces but does not eliminate incompatibility during deployment, rollback, or partial failure.
- The absence of individual token revocation leaves an issued token usable until expiry unless the signing key is rotated.

## Revisit conditions

This decision should be reconsidered if:

- The tRPC boundary prevents independent evolution that becomes necessary for the CMS or website.
- Request-time CMS latency or availability cannot meet the website's delivery requirements.
- The token exchange adds disproportionate latency or operational complexity.
- Another client must consume the CMS interface without sharing the TypeScript monorepo.
- Coordinated deployment or rollback cannot preserve contract compatibility reliably.
- Direct content push or prebuilt delivery becomes materially simpler than request-time retrieval.

## Related documentation

- [Architecture overview](../architecture-overview.md)
- [Content and publishing](../content-and-publishing.md)
- [Website delivery](../website-delivery.md)
- [Development and operations](../development-and-operations.md)
- [Quality and safety](../quality-and-safety.md)
- [Risks and deferrals](../risks-and-deferrals.md)
- [Functional public website](../../functional/public-website.md)
- [Functional content management](../../functional/content-management.md)
- [Functional forms](../../functional/forms.md)
- [ADR 0001: Separate the CMS and public website](0001-separate-cms-and-public-website.md)
- [ADR 0002: Use Payload CMS](0002-use-payload-cms.md)
- [ADR 0003: Use React Router Framework](0003-use-react-router-framework.md)
- [ADR 0004: Deploy on Cloudflare Workers](0004-deploy-on-cloudflare-workers.md)
- [ADR 0008: Use Cloudflare CDN caching with targeted publication invalidation](0008-use-cloudflare-cdn-caching-with-targeted-publication-invalidation.md)
- [ADR 0009: Use Turso-backed RAG for AI search](0009-use-turso-backed-rag-for-ai-search.md)
- [ADR 0010: Use single-use tokens for shared previews](0010-use-single-use-tokens-for-shared-previews.md)

[Back to architecture decision records](README.md)
