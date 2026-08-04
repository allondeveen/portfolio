# ADR 0008: Use Cloudflare CDN caching with targeted publication invalidation

> **Status: Accepted**
>
> **Decision state:** Cloudflare caches eligible final HTML responses by request URL. Publication changes trigger targeted purges of every affected cached representation, while broadly shared content purges the website HTML cache. A failed purge does not block the content save and is repeated manually through the Cloudflare dashboard.

## Context

The public website renders pages by calling the CMS, mapping CMS records to the shared domain model, and rendering the result in the website Worker. Most public portfolio content changes much less frequently than it is read. Repeating that pipeline for every visitor would add latency and CMS load without improving the response between publications.

Cloudflare already fronts the website, runs the Workers, and owns the accepted response-cache boundary. Caching the final HTML response avoids executing the complete website-to-CMS path on a cache hit and does not introduce another storage service. The application nevertheless needs a publication-aware invalidation mechanism: a long-lived cached response must not keep showing an outdated page, obsolete URL, removed item, old overview, or stale shared content after the public state changes.

Only changes that alter public output trigger publication invalidation. Saving or editing a draft without changing the published representation does not purge public HTML. Manual and scheduled publication, public updates, slug changes, and unpublishing apply the same rules when they change public output.

## Decision drivers

### Delivery performance

The cached artifact should be the complete visitor-facing HTML response so a cache hit can bypass CMS authentication, content retrieval, mapping, and rendering. Cloudflare's distributed CDN cache is already on the public request path and is designed for this kind of response delivery.

### Proportionate integration and cost

The portfolio does not justify a separate search cluster or cache service merely to accelerate public reads. The selected mechanism should reuse the existing Cloudflare platform and require application integration primarily where the CMS knows that published content changed.

### Publication correctness

Invalidation must follow public-content dependencies rather than purging only the record that initiated a change. A change can affect a canonical detail page, an old slug, collection overviews, redirects, or pages that embed supporting content. Applicable invalidation rules therefore compose for a single content operation.

### Targeted invalidation

Routine publication events should remove only affected cached HTML. Clearing the entire website HTML cache is reserved for changes to content used broadly enough that enumerating every dependent page would be disproportionate or unreliable.

## Decision

Cache eligible final HTML responses in Cloudflare's CDN and invalidate affected responses when the public representation changes.

### Cache boundary

- Cloudflare owns the final-response cache for the eligible `GET` endpoints defined in [Website delivery](../website-delivery.md#public-entry-points).
- `/search`, form submissions, previews, AI-search responses, maintenance responses, and error responses remain outside this public HTML cache according to Website Delivery.
- This decision uses Cloudflare's CDN response caching rather than an application-owned cache datastore or the Worker Cache API.
- Public R2 media and other non-HTML Cloudflare resources are outside the cache-wide purge described by this ADR.
- Every deployment continues to purge the website HTML cache before maintenance mode is disabled.

### Cache identity

The cache identity is the request URL. Query parameters are part of that identity for overview pages, so different pagination and filtering URLs can have distinct cached HTML responses. The existing URL rules remain authoritative: the default first page omits `page=1`, and repeated `topics` parameters represent the selected topic filters.

### Invalidation rules

The rules are cumulative. One operation applies every rule whose condition is satisfied.

- A published page change purges the cached HTML for that page's current public URL.
- A published article change purges every article detail page, every cached representation of the article overview including pagination and filtering variants, and the homepage. This covers Related articles blocks on article pages and the Selected articles block on the homepage.
- A published project change purges every project detail page, every cached representation of the project overview including pagination and filtering variants, and the homepage. This covers Related projects blocks on project pages and the Selected projects block on the homepage.
- A slug change additionally purges the cached HTML for every old public URL affected by the path change. This includes descendant pages when a parent slug changes. The normal content-change rule still purges the current URL, and an article or project still applies its complete collection-and-homepage invalidation rule.
- Unpublishing purges the item's former public URL. Unpublishing an article or project also applies its complete collection-and-homepage invalidation rule.
- Creating or changing a redirect purges the cached response for every affected source URL. Automatically created redirects after a slug change are covered by this rule.
- A change to a page template, header, footer, or menu purges all cached HTML responses for the website because these records are broadly shared.
- A form change purges the public URLs of every page that uses the form. The current design contains only the contact form, so the dependency set is small and direct.

Purges use the narrowest Cloudflare purge scope that covers every affected representation. URL purging is preferred for individual pages and redirect sources. Article and project invalidation may use collection prefixes, cache tags, or another targeted Cloudflare scope that covers every detail and overview representation, together with the homepage. The exact mechanism is an implementation detail provided that all dependencies are invalidated. A cache-wide operation is limited to the website HTML boundary defined above.

The CMS publication operation owns identifying the affected content and dependencies. Exact hook placement, purge-request construction, batching, credentials, and Cloudflare configuration remain implementation details.

### Invalidation failure

A failed or partially successful purge does not block or roll back the content save. The failure is logged so it can be handled operationally. A developer repeats the intended purge manually through the Cloudflare dashboard, using the same targeted scope identified for the original invalidation.

No bounded maximum staleness is guaranteed after an invalidation failure. The previous HTML may remain available until the manual purge succeeds or the cache entry expires. This temporary inconsistency is accepted for the portfolio, with manual purging as the recovery mechanism.

## Alternatives considered

### Do not cache rendered pages

Every request could execute the website Worker, call the CMS, and render a fresh response. This would avoid cache invalidation and give successful requests the current published state, but it would repeat an expensive pipeline for content that changes infrequently. Public performance and availability would also remain more dependent on the CMS and complete integration path.

### Use Cloudflare caching with expiration only

Responses could use a short time to live and become fresh when they expire, without publication-driven purges. This would reduce invalidation integration, but every publication, slug change, redirect, and unpublishing operation could remain stale for the full cache lifetime. Deliberate publication staleness was not selected.

### Manage caching inside the website Worker

The website could use the Cloudflare Workers Cache API and own cache lookup, storage, keys, and invalidation in application code. This would provide detailed programmatic control, but would execute the Worker before serving the cached value and create more application-owned cache behaviour than is required for final HTML delivery. It also would not remove the need to map publication events to affected entries.

### Use Redis or another dedicated cache

A separate cache could store CMS results, domain objects, or rendered responses. It would add another service, credential boundary, network dependency, cost, and custom integration while duplicating a caching capability already present on the delivery path. It was not selected for the portfolio's scale and read patterns.

### Use Elasticsearch as a published read model

Published content could be denormalized into Elasticsearch and queried as a read-optimized representation. This can be useful when sophisticated search and filtering are primary requirements, but using it as a page-delivery cache would add indexing, synchronization, operation, and cost disproportionate to this use case. It would not by itself cache the final rendered HTML.

### Generate static pages during publication

Publication could build and deploy static HTML rather than invalidate runtime responses. This would provide efficient reads, but would couple editing and scheduled publication to a generation pipeline and complicate immediate deletion, redirects, shared-content changes, and recovery. The accepted runtime CMS retrieval and rendering model does not require this additional delivery architecture.

## Consequences

Positive consequences:

- Cache hits can return complete HTML without executing the website-to-CMS pipeline.
- Caching and invalidation use the Cloudflare platform already selected for hosting and delivery.
- No separate response-cache datastore or search cluster is required.
- Routine content changes purge only affected public representations.
- Cumulative rules preserve related-content, homepage-overview, collection-overview, and redirect correctness for combined changes such as renaming an article.
- Draft-only editing does not unnecessarily evict public content.

Negative consequences:

- Publication becomes operationally coupled to the Cloudflare purge interface.
- The CMS must determine direct and dependent public URLs correctly.
- A missed dependency or incorrect cache identity can leave stale public content even when the initiating page was purged.
- Any article or project change evicts every cached detail page of the same type, every overview variant, and the homepage, causing substantially more cache misses than invalidating only the changed page.
- Shared templates, headers, footers, and menus cause a broad HTML-cache purge and a temporary increase in cache misses.
- Form invalidation requires reverse dependency lookup; the simple contact-form case does not establish a scalable design for many reusable forms.
- A successful content save can temporarily coexist with stale public HTML when automatic invalidation fails.
- Recovery from a failed purge requires a developer to repeat the operation manually through the Cloudflare dashboard.
- Distinct query-parameter URLs create distinct overview cache entries and must all be covered by dependency invalidation.

## Revisit conditions

Revisit this decision if:

- Publication volume or article/project dependency fan-out makes collection-level invalidation limits, cache churn, or latency problematic.
- Many reusable forms make reverse dependency lookup expensive or unreliable.
- Shared-content changes purge the complete HTML cache frequently enough to damage performance materially.
- Visitors repeatedly receive stale pages, redirects, overviews, or shared content after successful publication.
- Cache identity becomes substantially more complex through localization, personalization, device variants, or additional query-driven representations.
- A dedicated cache, static-generation pipeline, or other delivery model becomes operationally simpler than maintaining publication-driven invalidation.
- Cloudflare pricing, limits, availability, or purge behaviour no longer meets the publication requirements.

## Related documentation

- [Content and publishing](../content-and-publishing.md)
- [Website delivery](../website-delivery.md)
- [Quality and safety](../quality-and-safety.md)
- [Development and operations](../development-and-operations.md)
- [Risks and deferrals](../risks-and-deferrals.md)
- [Functional content management](../../functional/content-management.md)
- [ADR 0004: Deploy on Cloudflare Workers](0004-deploy-on-cloudflare-workers.md)
- [ADR 0007: Use tRPC for website-to-CMS data access](0007-use-trpc-for-website-to-cms-data-access.md)

[Back to architecture decision records](README.md)
