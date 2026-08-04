# ADR 0005: Use Cloudflare D1 for relational storage

> **Status: Accepted**
>
> **Decision state:** Cloudflare D1 provides the persistent relational storage used by Payload CMS. AI-search vector storage remains owned by ADR 0009. Native D1 Time Travel provides migration recovery.

## Context

The CMS and website execute in Cloudflare Workers. Worker instances are ephemeral and cannot own durable application state, so persistent data must be stored outside the request-serving runtime and reached through a Worker-compatible mechanism.

The CMS requires more than generic key-value persistence. Its pages, articles, projects, taxonomies, menus, forms, templates, revisions, redirects, users, and other records have explicit relationships and consistency rules. The selected storage must support Payload's relational model, constraints, reviewed schema migrations, and the portfolio's read-heavy, low-write workload.

ADR 0005 previously selected Neon-hosted PostgreSQL for both Payload persistence and `pgvector`-based AI retrieval. That choice was reconsidered after Payload provided a dedicated Cloudflare D1 adapter and D1 became a direct, supported fit for the selected Worker runtime. The earlier ADR explicitly identified a Cloudflare-native database that materially reduced integration complexity as a revisit condition.

AI-search ingestion and vector retrieval are separate from Payload's relational persistence. Payload would not create or synchronize embeddings automatically when PostgreSQL and `pgvector` were used. Vector storage, ingestion timing, synchronization, and retrieval therefore remain decisions for [ADR 0009](0009-use-turso-backed-rag-for-ai-search.md) rather than reasons to keep the CMS on PostgreSQL.

## Decision drivers

### Payload compatibility

Payload provides the `@payloadcms/db-d1-sqlite` adapter for Cloudflare D1. It uses D1's SQLite semantics through Payload's relational and Drizzle-based persistence model and supports the CMS collections, relationships, blocks, revisions, drafts, and other required Payload behaviour without importing a PostgreSQL connection layer into the Worker.

The application does not require PostgreSQL-specific data types, extensions, stored procedures, or the Payload Point field. Its relationships are explicit but its scale and write concurrency are limited, making SQLite semantics proportionate to the use case.

### Worker-runtime fit

The CMS accesses D1 through an environment-specific Worker binding. It does not need an external database URL, a cross-provider network connection, connection pooling, Hyperdrive, or separate serverless and operational connection modes.

D1 remains durable state outside the Worker instance even though it is attached through a binding. Development, staging, and production use separate databases and bindings under the accepted environment-isolation rules.

### Scope and limits

The portfolio is expected to remain well within D1's database-size, row-size, query-duration, and per-invocation query limits. The CMS workload is dominated by content reads and low-frequency editorial writes rather than high-concurrency transactional processing.

These assumptions must be measured during implementation. Appropriate indexes and bounded queries remain necessary; selecting a Cloudflare-native database does not make every query local, fast, or unlimited.

### AI-search boundary

D1 is selected only for relational CMS persistence. It is not treated as a vector database. ADR 0009 owns the vector-storage provider, ingestion pipeline, embedding and chunk schema, indexing consistency, reconciliation, filtering, ranking, and query behaviour.

Choosing D1 removes `pgvector` as an implicit co-located option and makes a separate vector capability likely. That additional derived-data boundary is accepted because an ingestion and synchronization design was required even when the vector data would have been stored in Neon.

### Operational boundary

Payload's version-controlled migration workflow is used for D1 schema and persisted-content changes. Migrations are generated and executed through Payload's migration commands, reviewed with the release, and applied by the dedicated deployment workflow rather than by request-serving Workers.

D1 Time Travel provides the database backup and point-in-time recovery mechanism. Immediately before a migration, the GitHub Actions pipeline retrieves the current D1 bookmark and stores its ID in pipeline state. The migration cannot start unless that step succeeds and produces a bookmark ID. If the migration or a later release step fails after migration processing begins, the automated recovery workflow uses that same bookmark ID to restore D1 in place within the same pipeline.

Time Travel history is retained for 30 days. The deployment environment must therefore use a Cloudflare plan that provides the required 30-day Time Travel window. No database export or separate backup object storage is part of this decision.

## Decision

Use Cloudflare D1 for the application's persistent relational CMS storage.

- Store Payload-managed data in an environment-specific D1 database through `@payloadcms/db-d1-sqlite`.
- Give the CMS Worker direct access through its configured D1 binding.
- Do not give the website direct access to the CMS database; the accepted tRPC boundary in [ADR 0007](0007-use-trpc-for-website-to-cms-data-access.md) remains authoritative.
- Use Payload's version-controlled migration files and migration commands for schema and persisted-content changes.
- Apply production migrations through the dedicated deployment workflow, never during a visitor or editor request.
- Retrieve and store the current D1 Time Travel bookmark ID in the GitHub Actions pipeline immediately before applying a migration.
- Automatically restore D1 to that bookmark in the same pipeline if the migration or a later release step fails after migration processing begins.
- Retain D1 Time Travel recovery history for 30 days.
- Supply database identifiers, bindings, and operational credentials through environment or hosting configuration outside source code.
- Maintain separate D1 databases and bindings for development, staging, and production.
- Keep vector storage and the complete RAG ingestion and query design in ADR 0009.

Exact binding names, generated schema layout, indexes, query construction, local emulation configuration, and database limits monitoring are implementation details subject to these constraints.

## Alternatives considered

### Continue using Neon-hosted PostgreSQL

Neon would provide mature PostgreSQL behaviour, a broad operational ecosystem, greater write concurrency, conventional backup tools, and the option to store vectors through `pgvector`. It would also require a verified Worker-compatible connection and pooling path for Payload, add a separate infrastructure provider, and preserve integration complexity that D1 avoids.

The portfolio does not currently require PostgreSQL-specific capabilities or scale. Co-locating vectors would not remove the need for an AI ingestion and synchronization strategy. Neon was therefore replaced once Payload's dedicated D1 adapter made the Cloudflare-native option a supported fit.

### Use another managed PostgreSQL provider

Another provider could preserve PostgreSQL semantics and tooling while changing Neon's availability, pricing, or connection characteristics. It would retain the same cross-provider Worker connectivity and operational boundaries without providing a project-specific benefit over D1.

### Use another hosted SQLite provider

Another SQLite service could retain a lightweight relational model. It would require an external connection mechanism and provider integration instead of using Payload's dedicated D1 adapter and a native Worker binding.

### Use MongoDB for Payload persistence

Payload supports MongoDB, and a document model could store complex blocks and nested CMS records naturally. It was not selected because the application's explicit relationships and constraints fit Payload's relational representation, and D1 now supplies that model directly within the selected hosting platform.

## Consequences

Positive consequences:

- Payload relational persistence uses a dedicated, supported D1 adapter.
- The CMS database is accessed through a native Worker binding without external connection pooling or PostgreSQL compatibility infrastructure.
- The CMS, database, Workers, R2 media, cache, and routing use one operational platform with less infrastructure glue.
- D1's SQLite model is proportionate to the portfolio's storage size, query patterns, and editorial write volume.
- Environment isolation maps directly to separate D1 databases and bindings.
- Durable relational state remains outside ephemeral Worker instances.
- AI-search persistence can be selected for retrieval needs rather than being coupled to the CMS database provider.

Negative consequences:

- The system becomes more dependent on Cloudflare's availability, account state, limits, pricing, and configuration.
- D1 has SQLite semantics and lower single-database write concurrency and storage limits than PostgreSQL.
- PostgreSQL-specific capabilities, tooling, and portability are no longer available.
- AI search cannot use `pgvector` in the CMS database and will likely require a separate vector service and derived-data boundary.
- D1 and any separate vector store cannot be updated through one database transaction.
- Database recovery depends on Cloudflare's native Time Travel history and on the pipeline retaining the correct pre-migration bookmark ID.
- Time Travel restoration overwrites the database in place and cancels in-flight database work; maintenance mode prevents normal application traffic during this operation.
- Recovery points expire after 30 days and do not provide an archive beyond that window.
- Moving away from D1 would require a Payload database-adapter change and a relational-data migration.

The native Worker integration, official Payload adapter, use-case fit, and reduction in infrastructure glue are considered sufficient to accept these costs.

## Revisit conditions

Revisit this decision if:

- Payload's D1 adapter does not support required CMS behaviour reliably.
- D1's SQLite semantics, query limits, storage limits, or write concurrency prevent required content operations.
- CMS query latency or availability cannot meet the editing and uncached-delivery requirements.
- Migration or restoration constraints cannot meet the coordinated-release and recovery requirements.
- Cloudflare service concentration becomes unacceptable after an incident or a change in availability requirements.
- The accepted AI-search architecture makes PostgreSQL and `pgvector` materially simpler overall than D1 plus its selected vector store.
- A different relational provider materially improves reliability, portability, or operational simplicity without reintroducing disproportionate infrastructure glue.

## Related documentation

- [Architecture overview](../architecture-overview.md)
- [Content and publishing](../content-and-publishing.md)
- [Website delivery](../website-delivery.md)
- [Development and operations](../development-and-operations.md)
- [Risks and deferrals](../risks-and-deferrals.md)
- [Functional content model](../../functional/content-model.md)
- [Functional content management](../../functional/content-management.md)
- [ADR 0002: Use Payload CMS](0002-use-payload-cms.md)
- [ADR 0004: Deploy on Cloudflare Workers](0004-deploy-on-cloudflare-workers.md)
- [ADR 0007: Use tRPC for website-to-CMS data access](0007-use-trpc-for-website-to-cms-data-access.md)
- [ADR 0009: Use Turso-backed RAG for AI search](0009-use-turso-backed-rag-for-ai-search.md)

[Back to architecture decision records](README.md)
