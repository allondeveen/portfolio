# ADR 0011: Use Neon with a caching layer between the website and CMS

> **Status: Accepted**
>
> **Date:** 2026-09-07
>
> **Decision state:** Neon PostgreSQL provides Payload CMS persistence. The CMS remains on Cloudflare Workers, with placement configured to favour proximity to the database. The public website remains on Cloudflare and caches complete public CMS responses to avoid CMS and database work on cache hits.
>
> **Supersedes:** ADR 0005 for relational storage and ADR 0008's selection of final HTML as the sole public-content cache boundary. ADR 0004's Workers hosting decision and eligible final-response caching remain compatible with this decision.

## Context

The public website requires low-latency content delivery. Editorial operations can tolerate higher latency, and public content and AI advice can tolerate delayed freshness. These differences allow editorial persistence and public delivery to use different performance strategies.

Content URL changes and their associated redirects must save atomically. This includes descendant page moves and updating earlier redirects to point directly to the newest URL. Manual and automatic redirects must enforce the same invariants. Invalid changes must not leave partially saved content or redirects.

The installed Payload D1 adapter, version 3.87.0, does not integrate D1's atomic batch operations into ordinary Payload saves. Providing the required guarantees would require custom persistence integration or a separate publication storage layer. The adapter is labelled beta, and Cloudflare's global D1 read replication is also in beta. These constraints conflict with the desired production stability and maintenance scope.

Executing application code near a visitor does not ensure low latency when the application performs sequential queries against a distant database. Regional database replicas can reduce read latency, but introduce additional instance costs, routing requirements, and replication-consistency concerns. They are not required if public delivery can reuse complete cached CMS responses.

The current public-content procedure retrieves documents, shared content, and other dependencies, then validates and maps the result. Caching only selected database queries after fresh redirect and document lookups would retain much of this work and its network latency. Caching the complete public CMS response can bypass the entire CMS request on a cache hit.

## Decision

### Relational persistence

Move Payload's relational persistence back to Neon PostgreSQL using Payload's PostgreSQL adapter and transaction support.

Content changes, descendant URL updates, automatic redirect creation, and updates to earlier redirects must participate in the same database transaction. Nested Payload operations must be awaited and use the same request transaction context. Manual and automatic paths must apply the same normalization and validation rules.

Concurrent saves must not persist duplicate sources, route conflicts, redirect chains, or loops. Transaction configuration, database constraints, and validation must be verified together; atomic writes alone do not establish all application invariants.

### CMS deployment

Keep the CMS on Cloudflare Workers. Configure placement to favour proximity to the Neon database, using an explicit cloud-region hint where supported. The hint must match the selected Neon deployment region.

Placement selects a Cloudflare data centre with low latency to the specified region; it does not deploy the CMS inside Neon's infrastructure or guarantee exact physical co-location. The website Worker retains its public-delivery placement independently.

Cloudflare currently labels Workers Placement beta. Placement is therefore an optional performance optimization, not a dependency of transaction correctness. Its availability and effect must be verified for the deployed CMS request path; documented placement support applies to fetch handlers rather than RPC methods or named entrypoints. Failure to obtain favourable placement affects latency without changing the selected hosting platform or persistence guarantees.

### Website-to-CMS caching

Introduce caching between the public website and the CMS for complete public CMS responses, except the maitenance build. A cached response represents the resolved public document or redirect, including the mapped content needed by the website.

On a cache hit, the website uses the cached result without contacting the CMS. This avoids CMS authentication, redirect and document queries, dependency retrieval, validation, and mapping. Website rendering still occurs unless an eligible final response is also cached.

On a cache miss, the website calls the CMS and obtains a response eligible for caching under the public-delivery policy. Cache misses continue to incur CMS and database latency. Regional database replicas and dual Hyperdrive bindings are not prerequisites for this architecture.

Drafts, previews, private responses, and errors must not enter the shared public-content cache. Cache identity must account for inputs that affect public output, including any configured query-string redirect behaviour.

### Publication consistency

Delayed visibility is acceptable; inconsistent publication is not. Public delivery must preserve the relationship between content routes and redirects, including the separate request made when a visitor follows a redirect.

Database transactions establish atomic saves at the origin. They do not atomically refresh independently cached URLs. Independent expiration or targeted purging alone must not be treated as proof that content and redirects become visible consistently.

The cache technology, publication versioning, invalidation, retention, and recovery mechanisms remain implementation decisions. Those mechanisms must demonstrate that a newly visible redirect cannot lead to an unavailable destination because another cached response represents an older publication state. A versioned publication approach is a candidate, not a requirement to introduce the custom D1 snapshot tables previously considered.

### AI-search boundary

AI-search indexing may follow publication asynchronously. Delayed freshness of advice is acceptable, and retrieval or answer caching may be introduced where appropriate.

This decision does not change the vector-storage provider or retrieval design selected by ADR 0009. Public eligibility, removals, and citation usability remain explicit synchronization concerns. Caching does not guarantee that a previously unseen query avoids retrieval or generation work.

## Alternatives considered

| Alternative                                                      | Reason not selected                                                                                                                                                               |
| ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Payload with D1                                                  | The experimental adapter does not combine ordinary saves and hook writes into D1 atomic batches.                                                                                  |
| Custom D1 persistence or publication tables                      | Additional adapter integration, public storage, and publication logic exceed the desired maintenance scope.                                                                       |
| Regional PostgreSQL replicas                                     | Additional instance costs, replica selection, and consistency handling are unnecessary for the initial cached-delivery architecture.                                              |
| Hyperdrive query caching with separate fresh and cached bindings | Fresh route and document lookups retain much of the existing request cost, while independent cached queries still require consistency handling.                                   |
| Turso for CMS persistence                                        | Interactive transactions are available, but managed regional replica availability for new customers and embedded-replica suitability for Payload on Workers were not established. |
| Uncached public CMS requests                                     | Every request repeats CMS processing and database access despite infrequent editorial changes.                                                                                    |

## Consequences

Positive consequences:

- Content and redirect saves use Payload's existing PostgreSQL transaction mechanism.
- Warm public requests avoid the CMS and relational database entirely.
- CMS placement can prioritize database proximity independently from public website placement.
- Regional replicas and custom D1 persistence are unnecessary for the initial architecture.
- Editorial persistence, public delivery, and AI retrieval can be optimized independently.

Negative consequences and follow-up work:

- Neon introduces an external database connection and requires migration of existing relational data.
- CMS Worker placement and Neon connectivity require deployment verification. Credentials, migrations, backups, and recovery procedures must be aligned with Neon persistence.
- Cache misses retain origin latency, and cache effectiveness depends on the workload.
- Publication-aware cache consistency and refresh behaviour require explicit implementation and verification.
- Public content and AI advice may temporarily reflect earlier publications.
- Uncached AI requests may still require retrieval and generation.
- Affected architecture, delivery, operations, and earlier ADR status references require reconciliation as the migration is implemented.

## Validation

Before production rollout, verify that:

- A failure after content and redirect writes rolls back the entire save.
- Manual redirects, automatic redirects, descendant moves, and concurrent saves enforce the accepted invariants.
- Public cache hits bypass the CMS, while previews and private content bypass the shared cache.
- The deployed CMS request path supports the selected placement configuration, and measured CMS-to-database latency confirms its benefit.
- Publication and cache refresh failures preserve usable redirect destinations across requests.
- Cache-hit latency, cache-miss latency, hit rates, CMS save latency, and AI-index freshness are measured separately.

## Revisit conditions

Revisit this decision if:

- Measured cache-miss latency or cache effectiveness fails to meet public-delivery requirements.
- Publication consistency requires disproportionate custom infrastructure.
- Neon cost, availability, or transaction behaviour becomes unsuitable for the workload.
- Global read replicas become necessary based on observed traffic and latency.
- A stable Payload-compatible database integration provides materially simpler atomic saves and distributed reads.
- Freshness requirements change so that delayed public content or AI indexing is no longer acceptable.

## Related documentation

- [Cloudflare Workers Placement](https://developers.cloudflare.com/workers/configuration/placement/)
- [Architecture overview](../architecture-overview.md)
- [Content and publishing](../content-and-publishing.md)
- [Website delivery](../website-delivery.md)
- [Development and operations](../development-and-operations.md)
- [Risks and deferrals](../risks-and-deferrals.md)
- [Functional public website](../../functional/public-website.md)
- [ADR 0001: Separate the CMS and public website](0001-separate-cms-and-public-website.md)
- [ADR 0004: Deploy on Cloudflare Workers](0004-deploy-on-cloudflare-workers.md)
- [ADR 0005: Use Cloudflare D1 for relational storage](0005-use-cloudflare-d1-for-relational-storage.md)
- [ADR 0007: Use tRPC for website-to-CMS data access](0007-use-trpc-for-website-to-cms-data-access.md)
- [ADR 0008: Use Cloudflare CDN caching with targeted publication invalidation](0008-use-cloudflare-cdn-caching-with-targeted-publication-invalidation.md)
- [ADR 0009: Use Turso-backed RAG for AI search](0009-use-turso-backed-rag-for-ai-search.md)

[Back to architecture decision records](README.md)
