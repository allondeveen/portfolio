# Website delivery

## Document status

- **Maturity:** Accepted
- **Scope:** Request processing, rendering, content retrieval, caching, invalidation, redirects, preview delivery, error handling, and response behaviour.
- **Excludes:** Content-model definitions, editorial workflows, detailed AI-search architecture, quality verification, and operational procedures.
- **Prepared ADRs:** [ADR 0001](decisions/0001-separate-cms-and-public-website.md), [ADR 0003](decisions/0003-use-react-router-framework.md), [ADR 0004](decisions/0004-deploy-on-cloudflare-workers.md), [ADR 0006](decisions/0006-use-cloudflare-r2-for-object-storage.md), [ADR 0007](decisions/0007-use-trpc-for-website-to-cms-data-access.md), [ADR 0008](decisions/0008-use-cloudflare-cdn-caching-with-targeted-publication-invalidation.md), [ADR 0009](decisions/0009-use-turso-backed-rag-for-ai-search.md), and [ADR 0010](decisions/0010-use-single-use-tokens-for-shared-previews.md)
- **Related functional design:** [Requirements](../functional/requirements.md), [public website](../functional/public-website.md), [navigation](../functional/navigation.md), and [forms](../functional/forms.md)

## Purpose

This document defines how the public website turns requests and CMS-managed content into responses. It covers the delivery boundary, request pipeline, content retrieval and resolution, rendering, preview, redirects, caching, interactive requests, and delivery-time failure behaviour.

## Delivery boundaries

### Public entry points

The system has three application entry points:

- The website entry point serves visitors.
- The CMS entry point serves content editors, exposes a custom tRPC interface to the website, and acts as the OAuth authorization server.
- The maintenance entry point serves a maintenance-mode page from a separate Worker while maintenance mode is active.

The website exposes the following visitor-facing endpoints:

| Website endpoint    | Method | Server-side action                                                                                                                                                  | Request authentication | CMS integration                                                       | Caching                                         |
| ------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | --------------------------------------------------------------------- | ----------------------------------------------- |
| `/`                 | `GET`  | Retrieve the homepage together with the header, footer, not-found, and error-page templates                                                                         | None                   | [ADR 0007](decisions/0007-use-trpc-for-website-to-cms-data-access.md) | The final page response is cached by Cloudflare |
| `/articles`         | `GET`  | Retrieve the article overview and the requested page of article summaries together with the header, footer, not-found, and error-page templates                     | None                   | [ADR 0007](decisions/0007-use-trpc-for-website-to-cms-data-access.md) | The final page response is cached by Cloudflare |
| `/projects`         | `GET`  | Retrieve the project overview and the requested page of project summaries together with the header, footer, not-found, and error-page templates                     | None                   | [ADR 0007](decisions/0007-use-trpc-for-website-to-cms-data-access.md) | The final page response is cached by Cloudflare |
| `/search`           | `GET`  | Retrieve the Page assigned to the agentic-search route together with the header, footer, not-found, and error-page templates before the first prompt is submitted   | None                   | [ADR 0007](decisions/0007-use-trpc-for-website-to-cms-data-access.md) | Not cached                                      |
| `/forms/:id`        | `POST` | Forward the form submission to the CMS                                                                                                                              | None                   | [ADR 0007](decisions/0007-use-trpc-for-website-to-cms-data-access.md) | Not cached                                      |
| `/api/ai`           | `POST` | Execute AI search and return the machine-readable AI-interface response defined by [ADR 0009](decisions/0009-use-turso-backed-rag-for-ai-search.md)                 | Defined by ADR 0009    | Defined by ADR 0009                                                   | Not cached                                      |
| `/preview/articles` | `GET`  | Retrieve the article-overview preview and the requested page of article summaries together with the header, footer, not-found, and error-page templates             | One-time preview token | [ADR 0007](decisions/0007-use-trpc-for-website-to-cms-data-access.md) | Not cached                                      |
| `/preview/projects` | `GET`  | Retrieve the project-overview preview and the requested page of project summaries together with the header, footer, not-found, and error-page templates             | One-time preview token | [ADR 0007](decisions/0007-use-trpc-for-website-to-cms-data-access.md) | Not cached                                      |
| `/preview/*`        | `GET`  | Retrieve a preview from the complete contextual content path represented by the splat together with the header, footer, not-found, and error-page templates         | One-time preview token | [ADR 0007](decisions/0007-use-trpc-for-website-to-cms-data-access.md) | Not cached                                      |
| `/*`                | `GET`  | Retrieve published content from the complete contextual content path represented by the splat together with the header, footer, not-found, and error-page templates | None                   | [ADR 0007](decisions/0007-use-trpc-for-website-to-cms-data-access.md) | The final page response is cached by Cloudflare |

The published-content splat includes the complete hierarchical and contextual path. For example, it represents `about/team` for a hierarchical page, `articles/example-article` for an article, and `projects/example-project` for a project. The CMS uses the path segments to resolve the originating public collection, then normalizes the result to the shared public-content response consumed by the website.

The preview splat follows the same convention beneath `/preview/`. It represents the complete contextual content path after the preview prefix and is resolved through the CMS integration.

After redirect lookup, the homepage, collection overviews, search, form, API, and preview routes are matched before the published-content splat. They therefore cannot be interpreted as generic published-content requests. Each public collection has an explicit normal overview route and preview-overview route so their child routes can handle pagination parameters; its detail routes are handled by the two existing splat routes.

Media stored in R2 is delivered through public URLs on `https://media.allondeveen.com`. R2 is therefore a public asset origin, but not a separate application entry point.

### Website responsibilities

The website terminates visitor-facing application requests. It uses the server-side CMS integration defined by [ADR 0007](decisions/0007-use-trpc-for-website-to-cms-data-access.md) for public content, form submissions, and previews. It exposes the AI-search entry points; the complete AI-search architecture is defined by [ADR 0009](decisions/0009-use-turso-backed-rag-for-ai-search.md).

### Browser and server responsibilities

Browsers send application requests to the website. The website performs authenticated CMS and AI-search work from the server. Browsers never receive the CMS service credentials or call its protected interface directly. The complete website-to-CMS authentication contract belongs to [ADR 0007](decisions/0007-use-trpc-for-website-to-cms-data-access.md). Browsers retrieve media through public R2 URLs.

### Cross-origin and embedding policy

Application content is served through the website, while R2 media is served through public URLs. The application endpoints therefore do not require Cross-Origin Resource Sharing.

Website responses include the Content Security Policy directive `frame-ancestors 'none'`. The website's content therefore cannot be embedded in a frame by this website or by another site.

Embedded videos use YouTube iframe players. The Content Security Policy directive `frame-src https://www.youtube.com https://www.youtube-nocookie.com` permits standard and privacy-enhanced YouTube embeds without permitting frames from other origins.

### CMS and data-access boundary

The CMS and website are deployed separately. The website accesses CMS-managed capabilities only through the authenticated service boundary defined by [ADR 0007](decisions/0007-use-trpc-for-website-to-cms-data-access.md), rather than reading the CMS database directly. That ADR owns the tRPC procedure surface, content normalization, token exchange, JWT contract, authentication failures, and integration compatibility.

Website Delivery retains only the visitor-facing use of that boundary. Published-content and preview retrieval return one renderable content representation across public collections, and preview requests additionally require the request-specific token governed by [ADR 0010](decisions/0010-use-single-use-tokens-for-shared-previews.md).

### Media-delivery boundary

Uploaded media is stored in Cloudflare R2, referenced through media blocks, and delivered through public URLs using `media.allondeveen.com` as the public hostname. Images are available beneath `https://media.allondeveen.com/images/`, and downloadable files are available beneath `https://media.allondeveen.com/downloads/`.

### Interactive-service boundaries

The website retrieves the initial AI-search page and forwards form submissions through the CMS integration defined by ADR 0007. `POST /api/ai` is a website endpoint rather than a CMS integration endpoint. Its complete design is defined by [ADR 0009](decisions/0009-use-turso-backed-rag-for-ai-search.md).

### Cache boundaries

Cloudflare caches the final page responses produced for `GET /`, the normal collection-overview routes, and `GET /*`.

Cloudflare cache settings exclude every endpoint marked `Not cached` in the public-entry-point table. Responses from those endpoints do not set `Cache-Control: public`.

### Failure ownership

Known visitor-facing fallback behaviour is recorded under [Failure and degraded behaviour](#failure-and-degraded-behaviour).

### Deployment compatibility

The CMS and website are developed in the same monorepo and are always deployed together as one coordinated release, although they remain separate Cloudflare Workers. Both Workers are built from the same repository revision and are not independently versioned or released.

Both Workers are deployed at the same time. Temporary downtime and occasional request errors are accepted while the coordinated deployment is in progress.

Maintenance mode is activated through Cloudflare before every deployment. While it is active, Cloudflare routes all application traffic to the separate maintenance Worker, which resolves requests to the maintenance-mode page instead of the CMS or website Worker. Keeping this response outside the CMS and website Workers allows it to remain available while those Workers are being deployed or rolled back.

Maintenance mode is disabled only after the coordinated deployment succeeds. A failed release and its completed rollback leave maintenance mode active.

A release succeeds only when the website Worker and CMS Worker have both been deployed successfully and every database migration required by the release has been applied successfully. A release without a pending migration satisfies the database-migration condition without running a migration. A release fails when either Worker deployment fails or when a rollback is performed.

Once started, the coordinated deployment or its rollback must complete within one hour. Maintenance mode remains active after a failed release and rollback.

During deployment, the pipeline uses Payload's migration status to determine whether a D1 migration is pending. Before applying a pending migration, it retrieves the current D1 Time Travel bookmark and stores its ID in the GitHub Actions pipeline. It then applies the reviewed migration before deploying the Workers. A failure after migration processing begins starts the automated recovery workflow, which uses the stored bookmark to restore D1 automatically in the same pipeline and rolls back both Workers. Time Travel recovery history is retained for 30 days.

Compatibility with content, revisions, scheduled drafts, and blocks persisted by earlier releases must be preserved through compatible code or handled through migration.

The Payload migration workflow, release sequence, verification requirements, and handling of long-running migrations are defined in [Development and operations](development-and-operations.md#database-migrations).

The deployment empties the Cloudflare response cache before maintenance mode is disabled so that normal traffic does not resume with cached responses from the previous release.

The developer who triggers the deployment is responsible for monitoring the complete deployment and any automated recovery workflow through completion, and for handling a failure of that recovery workflow. Long-running migrations that exceed the coordinated-release window are triggered manually and performed by a dedicated GitHub Actions workflow before the next deployment. Maintenance mode remains active throughout that migration and is disabled only after the next deployment succeeds.

## Delivery guarantees

- Browsers do not access the protected CMS service interface or receive its service credentials.
- The website uses the authenticated CMS integration defined by [ADR 0007](decisions/0007-use-trpc-for-website-to-cms-data-access.md) for content retrieval, previews, and form submissions.
- A preview request requires the request-specific token governed by [ADR 0010](decisions/0010-use-single-use-tokens-for-shared-previews.md) in addition to the downstream service authorization governed by ADR 0007.
- An integration-authentication failure is represented to the visitor as an uncached service-unavailable response rather than as a visitor authentication failure.
- The CMS and website are built from the same monorepo revision and deployed together as one coordinated release.
- Both Workers are deployed at the same time; temporary downtime and occasional errors are accepted during deployment.
- A maintenance-mode page is served by a separate Worker.
- Cloudflare activates maintenance mode before every deployment and routes all application traffic to the maintenance Worker while it is active.
- Maintenance mode is disabled only after a successful deployment; a failed release and completed rollback leave it active.
- The maintenance Worker returns HTTP `503 Service Unavailable`, and its responses are not cached.
- A release succeeds only after both Workers are deployed successfully and every database migration required by the release is applied successfully; a release without a pending migration satisfies the migration condition without running one.
- A release fails if either Worker deployment fails or a rollback is performed.
- The coordinated deployment or rollback must complete within one hour of starting.
- Pending Payload migrations are applied and verified before both Workers are deployed concurrently.
- A migration that exceeds its allotted part of the release window causes the release to fail early enough to complete rollback within one hour; after rollback, that migration is applied separately before the next deployment.
- Native D1 Time Travel retains 30 days of recovery history.
- Before a migration, the GitHub Actions pipeline must retrieve and store the current D1 bookmark ID; the migration cannot start without it.
- If either Worker or another release step fails, the automated recovery workflow rolls back both Workers.
- If a release fails after migration processing begins, the automated recovery workflow restores D1 to the stored pre-migration bookmark in the same pipeline.
- The developer who triggers the deployment monitors the complete deployment and recovery process.
- The developer who triggers the deployment handles a failure of the automated recovery workflow.
- Long-running migrations are triggered manually and performed by a dedicated GitHub Actions workflow before the next deployment.
- Maintenance mode remains active while a long-running migration is applied and until the next deployment succeeds.
- The Cloudflare response cache is emptied during deployment before maintenance mode is disabled.
- Application endpoints do not depend on Cross-Origin Resource Sharing.
- Content Security Policy uses `frame-ancestors 'none'` to prevent the website's content from being embedded in a frame by any origin.
- Content Security Policy limits embedded frames to standard and privacy-enhanced YouTube players through `frame-src https://www.youtube.com https://www.youtube-nocookie.com`.
- Public R2 media is served from `https://media.allondeveen.com`.
- Image URLs use the `/images/` namespace, and file-download URLs use the `/downloads/` namespace.
- Final homepage, collection-overview, and published-content responses are cached; the `/search` page, form submissions, previews, and responses from `POST /api/ai` are not cached.
- Cloudflare owns response caching; endpoints marked `Not cached` are excluded through Cloudflare settings and do not set `Cache-Control: public`.

## Request types

The delivery design supports:

1. `GET /` for the homepage
2. `GET /articles` for the paginated article overview
3. `GET /projects` for the paginated project overview
4. `GET /search` for the agentic-search page
5. `POST /forms/:id` for form submissions
6. `GET /preview/articles` for the paginated article-overview preview
7. `GET /preview/projects` for the paginated project-overview preview
8. `GET /preview/*` for previews from every public collection
9. `GET /*` for published content from every public collection
10. `POST /api/ai` for executing agentic search

Media requests use public R2 URLs.

The published-content splat contains the complete hierarchical and contextual path. The preview splat contains the equivalent path beneath `/preview/`. The CMS interprets their path segments, resolves the originating public collection, and returns the shared public-content representation.

The homepage, collection-overview, search, form, API, and preview routes take precedence over the published-content splat. Within the preview namespace, exact collection-overview routes take precedence over the preview splat.

## Request pipeline

### Homepage

For `GET /`, the website retrieves the homepage together with the header, footer, not-found, and error-page templates through the CMS integration. The website creates the final page response, which Cloudflare caches.

### Collection overviews

For `GET /articles` and `GET /projects`, the website supplies the collection context and pagination parameters through the CMS integration. It retrieves the requested overview, the requested page of content summaries, and the header, footer, not-found, and error-page templates. The website creates the final page response, which Cloudflare caches.

Every additional public collection adds one normal overview route with the same behaviour. Detail requests for the collection do not add another website route; they are handled by the published-content splat.

### Published content

For `GET /*`, the website passes the complete path represented by the splat through the CMS integration. The CMS uses the hierarchical and contextual path segments to resolve published content from the appropriate public collection. It normalizes the result to the shared public-content response and includes the header, footer, not-found, and error-page templates. The website renders the response through the shared renderer, and Cloudflare caches the final page response.

### Agentic-search page

For `GET /search`, the website retrieves the Page assigned to the agentic-search route and shown before the first prompt is submitted through the CMS integration. It is managed through the normal Pages collection rather than as a fixed template.

The retrieved content also includes the header, footer, not-found, and error-page templates. The response is not cached.

### Form submission

For `POST /forms/:id`, the website forwards the form submission through the CMS integration.

### Collection-overview previews

For `GET /preview/articles` and `GET /preview/projects`, the website forwards the request's one-time preview token, its URL-binding information, the collection context, and the pagination parameters through the CMS integration. The CMS `previews` procedure validates and consumes the token while retrieving the requested overview preview, the requested page of content summaries, and the header, footer, not-found, and error-page templates.

Every additional public collection adds one preview-overview route with the same behaviour.

### Content previews

For `GET /preview/*`, the website forwards the request's one-time preview token, its URL-binding information, and the complete contextual content path represented by the splat through the CMS integration. The CMS `previews` procedure validates and consumes the token, resolves the bound revision and its permitted referenced unpublished content, and normalizes the result to the same shared public-content response used for published content.

### Agentic search

For `POST /api/ai`, the website executes AI search and returns the structured AI-interface response defined by [ADR 0009](decisions/0009-use-turso-backed-rag-for-ai-search.md). The response is not cached.

## CMS integration contract

[ADR 0007](decisions/0007-use-trpc-for-website-to-cms-data-access.md) is the authoritative definition of the website-to-CMS integration. It records ownership of the shared CMS-agnostic domain model and owns the tRPC procedure surface, path and pagination inputs, content normalization, Client Credentials token exchange, JWT construction and validation, authentication failures, and compatibility requirements.

This document uses that integration to define visitor-facing delivery behaviour. It does not duplicate the integration mechanics. Exact tRPC schemas and CMS query construction remain implementation details under ADR 0007.

## Content resolution and composition

The technical representation and composition constraints of content blocks are defined in [Content and publishing](content-and-publishing.md).

### Media

- The public website reads media through image and file-download blocks.
- Image blocks read media from `https://media.allondeveen.com/images/`.
- File-download blocks read files from `https://media.allondeveen.com/downloads/`.
- Embedded-video blocks render YouTube iframe players from `https://www.youtube.com` or `https://www.youtube-nocookie.com`. Other video-frame origins are not supported.

### Menus

- The public website reads menus through menu blocks.

### Forms

- The public website reads forms through form blocks.

### Templates

- CMS content and preview retrieval include the header, footer, not-found, and error-page templates with the requested content.

### Content blocks

Every public collection uses the same content-block contract. The CMS normalizes resolved documents into a header, footer, and content blocks between them. The website uses the same block renderer regardless of the originating public collection. Not-found and error-page content uses the same rendering contract.

The server-side mapping step ignores unknown or unsupported block types. Every mapped content block is static. The client-side AI interface is a route-specific component and does not participate in CMS block mapping.

### Relationships and dynamic content

The server-side mapping step resolves the data required by related-content blocks, including related-article and related-project blocks. Their mapped output is static; these blocks do not resolve their data in the browser.

## Rendering

The website creates final homepage, collection-overview, and published-content responses through the shared renderer, and Cloudflare caches them.

The `/search` response renders the configured Page's introductory content together with the route-specific AI interface before the visitor submits the first prompt.

All content blocks are rendered as static output and do not require client hydration. The AI interface is rendered as a client-side route component and remains dynamic after the initial page response. Metadata and structured-data guarantees belong in [Quality and safety](quality-and-safety.md).

## Preview delivery

Preview delivery uses an exact overview route for each public collection and one splat route for all preview details:

- `GET /preview/articles` retrieves the article-overview preview using its path and pagination input.
- `GET /preview/projects` retrieves the project-overview preview using its path and pagination input.
- `GET /preview/*` retrieves preview content using the complete contextual path represented by the splat.

An additional public collection adds one preview-overview route; its preview details reuse `GET /preview/*`. The CMS integration retrieves and normalizes the requested content together with the header, footer, not-found, and error-page templates. The incoming preview request must contain a one-time preview token, which the website forwards to the CMS `previews` procedure. That procedure validates and atomically consumes the token during successful retrieval; the downstream service call is separately authorized under ADR 0007. Preview responses are rendered through the shared renderer and are not cached.

The preview routes and their two authorization layers are the delivery boundary recorded here. [ADR 0010](decisions/0010-use-single-use-tokens-for-shared-previews.md) defines the one-hour single-use token, its website-URL, content-item, and saved-revision bindings, its referenced-content scope, and the public-only result used for expired, invalid, already-used, or mismatched tokens.

## Redirect delivery

- For requests that reach the website Worker, the website checks redirects before application routing.
- When the current request matches a redirect, the response redirects to its destination.
- Redirect responses use a permanent HTTP status because redirects do not represent website tests, maintenance, or temporary promotions.
- Request query strings do not affect redirect matching or the resulting redirect location unless the redirect record explicitly specifies query-string behaviour.
- When no redirect matches, application routing and normal request processing continue.

Cloudflare owns cache lookup outside the application-routing pipeline. Creating or changing a redirect purges the cached response for every affected source URL according to [ADR 0008](decisions/0008-use-cloudflare-cdn-caching-with-targeted-publication-invalidation.md).

Redirect creation and validation are defined in [Content and publishing](content-and-publishing.md).

## Caching and invalidation

Cloudflare caches final responses for:

- `GET /`
- normal collection-overview routes, including `GET /articles` and `GET /projects`
- `GET /*`

Cloudflare cache settings exclude `/search`, form submissions, previews, and responses from `POST /api/ai`. These responses do not set `Cache-Control: public`.

Every deployment empties the Cloudflare response cache before maintenance mode is disabled.

Publication-driven invalidation follows [ADR 0008](decisions/0008-use-cloudflare-cdn-caching-with-targeted-publication-invalidation.md). Its rules compose when one change has several effects:

- A published page change purges its current public URL.
- A published article change purges every article detail page, every cached pagination or filtering representation of the article overview, and the homepage because those responses can contain Related articles or Selected articles blocks.
- A published project change purges every project detail page, every cached pagination or filtering representation of the project overview, and the homepage because those responses can contain Related projects or Selected projects blocks.
- A slug change additionally purges every old URL affected by the path change, including descendant URLs after a parent slug changes.
- Unpublishing purges the former public URL and, for an article or project, applies the complete same-type detail, overview, and homepage invalidation rule.
- Redirect creation or modification purges every affected source URL.
- A page-template, header, footer, or menu change purges every cached website HTML response.
- A form change purges each public page that uses it.

Purges are targeted to the narrowest scope that covers every affected representation. A broad purge applies only to cached website HTML, not public media or unrelated Cloudflare cache entries. Draft-only changes do not invalidate public responses.

The cache identity is the request URL. Query parameters are included for collection-overview pages, so pagination and filtering URLs are cached independently. The existing URL normalization rules omit `page=1` and use repeated `topics` parameters for multiple topic filters.

A failed or partially successful purge does not block or roll back the content save. The failure is logged, and a developer repeats the intended targeted purge manually through the Cloudflare dashboard. No bounded maximum staleness is guaranteed after a purge failure; the previous HTML can remain available until the manual purge succeeds or the entry expires.

Exact cache configuration, header construction, purge request construction, batching, credentials, and Cloudflare dashboard operations remain implementation details.

## Interactive requests

### Form submissions

`POST /forms/:id` forwards the submission through the CMS integration defined by ADR 0007.

This document records only the website-to-CMS submission boundary. Form processing, personal-data handling, spam prevention, retries, and notification delivery are designed separately from website delivery.

### Agentic search

`GET /search` retrieves the Page assigned to the agentic-search route through the CMS integration before the visitor submits the first prompt. The retrieved content includes the header, footer, not-found, and error-page templates. The response is not cached.

`POST /api/ai` returns machine-readable responses consumed by the route-specific AI interface. Generated explanatory content may use supported website content blocks, while conventional search results use the interface's own overview component. All further AI-search design belongs in [ADR 0009](decisions/0009-use-turso-backed-rag-for-ai-search.md).

## Failure and degraded behaviour

### Maintenance mode

While maintenance mode is active, Cloudflare routes all application traffic to a separate Worker that resolves requests to the maintenance page instead of relying on the CMS or website Worker. A successful deployment disables maintenance mode. A failed deployment, rollback, automated recovery workflow, or separately applied long-running migration leaves it active until a later deployment succeeds.

The maintenance Worker returns HTTP `503 Service Unavailable`. Its responses are excluded from caching so visitors and intermediaries do not retain the maintenance page after maintenance mode is disabled.

### Invalid runtime configuration

The CMS and website validate their required configuration at runtime. If either application's configuration is invalid, that application returns HTTP `500 Internal Server Error` and displays an error page instead of continuing normal request processing. When invalid CMS configuration makes the CMS unavailable to the website, the visitor-facing website response follows the CMS-unavailability rule and returns `503`.

### Missing media

- Alternative text is displayed when referenced media cannot be loaded.

### Missing supporting content

- If a menu cannot be found, its entire block is omitted.
- If a form cannot be found, its entire block is omitted.

### Missing templates

- If the header template is missing, the website displays an error page.
- If the header template is missing, the website cannot be displayed and an error message is returned.
- Missing non-header templates do not stop request processing.

### Unknown routes

An unknown route returns HTTP `404 Not Found` and renders the not-found page. Content that exists but is not publicly eligible and malformed contextual content paths use the same response without disclosing whether a CMS record exists.

### CMS unavailability

When the CMS is unavailable, including when downstream authentication recovery fails, the website returns HTTP `503 Service Unavailable` and renders the error page. The requirement to present the error page applies even though the CMS cannot serve error-page content during that request; the mechanism that makes the fallback available is an implementation detail.

### Form-submission failures

When the requested form does not exist, the website returns HTTP `404 Not Found` and renders the not-found page. When the form exists but its current state prevents submission, the website returns HTTP `409 Conflict` and renders the error page. When submitted form data fails validation, it returns HTTP `400 Bad Request`, retains the current page content, and displays the returned form-validation errors.

### Rendering failures

The website catches rendering failures in an error boundary and renders the error page. If rendering the error page also fails, the error boundary renders a fallback that does not depend on the failing error-page rendering path.

### Cross-cutting failure behaviour

When automatic invalidation fails, the save remains successful and stale HTML can remain visible until a developer repeats the purge manually through the Cloudflare dashboard. This failure is logged but does not produce a bounded staleness guarantee.

Invalid procedure input generated by the website and any unclassified application conflict or failure return HTTP `500 Internal Server Error` and render the error page. If that rendering also fails, the independent rendering fallback is used. The website-to-CMS integration does not use general automatic retries; logging and alerting expectations belong in [Quality and safety](quality-and-safety.md).

[Back to technical design](README.md)
