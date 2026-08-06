# Development and operations

## Document status

- **Maturity:** Accepted
- **Scope:** Local development, environments, configuration, continuous integration, deployment, database migrations, backups, monitoring, and operational procedures.
- **Excludes:** User-facing behaviour, content-model definitions, and detailed website request processing.
- **Prepared ADRs:** [ADR 0004](decisions/0004-deploy-on-cloudflare-workers.md), [ADR 0005](decisions/0005-use-cloudflare-d1-for-relational-storage.md), [ADR 0006](decisions/0006-use-cloudflare-r2-for-object-storage.md), [ADR 0008](decisions/0008-use-cloudflare-cdn-caching-with-targeted-publication-invalidation.md), and [ADR 0009](decisions/0009-use-turso-backed-rag-for-ai-search.md)
- **Related functional design:** No direct functional-design dependency has been identified yet.

## Purpose

This document defines how the system is developed, released, operated, and recovered. It covers environment boundaries, coordinated releases, D1 database migrations, and Time Travel recovery.

## Environments

The system has three environments: development, staging, and production. There are no preview deployments.

Each environment has separate databases, R2 buckets, caches, domains, credentials, and JWT signing keys. The AI-search index uses separate Turso Cloud databases in staging and production and a local embedded libSQL database in development. The next-generation Turso Database engine formerly known as Limbo is not used. Non-production environments may access production data, except for form-submission data. Production form submissions must not be accessible from either development or staging.

Database-migration and deployment workflows run only against staging and production. The mechanism through which permitted production data is made available to a non-production environment is an implementation detail, but it must preserve the resource, credential, and signing-key isolation between environments.

## Coordinated releases

### Release sequence

A release uses the following sequence:

1. Activate or confirm maintenance mode through Cloudflare so that all application traffic is served by the separate maintenance Worker.
2. Use Payload's migration status to determine whether the release contains a D1 migration that has not yet been applied.
3. If a migration is pending, retrieve the current D1 Time Travel bookmark, store its ID in the GitHub Actions pipeline, and then apply every pending migration through the dedicated deployment pipeline step.
4. If no migration is pending, continue without running the migration command.
5. Deploy the website Worker and CMS Worker within the same release process from the same repository revision.
6. Empty the Cloudflare response cache before normal traffic is restored.
7. Verify the applied migration when applicable and run the release-blocking path checks defined in [Quality and safety](quality-and-safety.md#verification-gates).
8. Mark the release as successful and disable maintenance mode.

The database migration runs before the two Workers are deployed. Maintenance mode prevents either application version from serving public requests against an intermediate release state. The deployment empties the response cache so that normal traffic does not resume with responses from the previous release.

The migration cannot start unless the pipeline successfully retrieves and stores a non-empty pre-migration bookmark ID. Cloudflare creates and retains the underlying Time Travel history; the pipeline records the bookmark that identifies the state to which this release can be restored.

### Release outcome and duration

A release succeeds only when the website Worker and CMS Worker have both been deployed successfully, every database migration required by the release has been applied and verified successfully, and all release-blocking path checks have passed. A release without a pending migration satisfies the database-migration condition without running a migration. A release fails if either Worker deployment or another release step fails, if a release-blocking check fails, or if a rollback is performed.

The coordinated deployment or its rollback must complete within one hour of starting. Maintenance mode is disabled only after a successful deployment.

If a release fails, the automated recovery workflow rolls back both Workers. When migration processing began, the same workflow uses the stored pre-migration bookmark ID to restore D1 automatically within the same pipeline. Neither the failed release nor the completed automated recovery workflow disables maintenance mode.

### Long-running migrations

If a migration exceeds its allotted part of the release window, the release fails and the automated recovery workflow starts while sufficient time remains to complete rollback within one hour. The migration is not retried as part of another coordinated deployment. After the failed release has been rolled back, the migration is applied and verified separately before the next deployment is attempted.

The developer triggers the long-running migration manually. A dedicated GitHub Actions workflow retrieves and stores a new pre-migration Time Travel bookmark, performs the migration, and verifies it while maintenance mode remains active after the failed release. A failure automatically restores that bookmark within the workflow. Completing the migration does not disable maintenance mode; it remains active until the next deployment succeeds.

Once the separately applied migration has been recorded in Payload's migration history, the next deployment skips it and applies only migrations that remain pending.

## Database migrations

### Migration source and generation

Payload configuration is the source of truth for the CMS-managed D1 schema. Schema changes are converted into version-controlled migration files with `payload migrate:create`. Generated migration logic is reviewed and tested before it is committed with the release.

Production schema changes are applied from committed migration files with `payload migrate`. Development may use the D1 adapter's schema-push behaviour for prototyping, but push mode is not used against staging or production because those environments execute reviewed migration history.

### Schema and persisted-content changes

Payload generates structural migration changes from differences between the previous migration state and the current Payload configuration. It does not infer every required transformation of existing content records.

Changes to persisted content, revisions, scheduled drafts, or block data are implemented in reviewed Payload migration files. Their TypeScript `up` and `down` functions may use the Payload API or D1-compatible SQLite operations to rename a stored block type, populate a newly required value, or transform stored data. A migration that cannot be reversed safely must state that limitation and define its recovery dependency before release.

### Execution and tracking

The deployment pipeline runs `payload migrate` once as a dedicated release step with access to the environment's D1 resource. The command reads the committed migration directory, applies pending migrations in order, and records successful application in Payload's migration history. `payload migrate:status` is used to determine and verify the applied state.

Only the dedicated pipeline step applies production migrations. The CMS and website Workers do not run migrations when they start or while handling requests.

### Transactions and failures

SQLite migration transaction behaviour is not assumed to be equivalent to the former PostgreSQL workflow. Each migration must be tested against D1 and must identify any operation that can leave partial state, together with its detection and recovery requirements.

Any migration-command failure fails the release. If the migration or a later release step fails after migration processing begins, the automated recovery workflow restores D1 in place with the pre-migration bookmark ID stored by that pipeline and rolls back both Workers.

### Verification

A database migration is considered successfully applied only when:

- `payload migrate` exits successfully.
- `payload migrate:status` reports the expected latest migration as applied.
- The CMS can connect to and query the migrated schema.
- Representative persisted content, including content blocks, can be read successfully.

The website and CMS path checks are performed after the Workers are deployed concurrently. The release is not successful until every release-blocking path check and, when applicable, the database-migration verification have passed.

## Database backup and restoration

Native D1 Time Travel provides backups and point-in-time recovery. It maintains database history automatically, so the deployment does not create or store a separate snapshot or export.

Immediately before a migration, the GitHub Actions pipeline retrieves the current D1 bookmark and stores its ID as pipeline state. Successful retrieval of a non-empty ID is the precondition and verification for continuing with the migration. The bookmark identifies the exact pre-migration database state for that release.

If the migration or a later release step fails after migration processing begins, the automated recovery workflow uses the stored bookmark ID to restore D1 in place within the same pipeline. A successful restoration step and the normal post-recovery database checks verify that the workflow completed. Maintenance mode remains active throughout recovery.

Time Travel recovery history is retained for 30 days. The staging and production environments must use a Cloudflare plan that supports that retention period. Recovery beyond 30 days and separate archival database exports are outside the accepted requirements.

## Operational ownership

The developer who triggers a deployment is responsible for monitoring the entire deployment and, when it is started, the automated recovery workflow through completion. This includes monitoring maintenance mode, Time Travel bookmark retrieval, database migration, both Worker deployments, release verification, rollback, restoration, and the exit codes of the corresponding GitHub Actions jobs. If the automated recovery workflow fails, that developer also owns the subsequent failure handling.

## Runtime configuration validation

The CMS and website validate their required configuration at runtime. If the configuration for either application is invalid, that application displays an error page instead of continuing normal request processing.

## Development runtime compatibility

The development environment emulates the Cloudflare runtime through a preview command. Development against that emulated runtime provides the required runtime-compatibility coverage before the application is deployed to staging or production.

The preview command runs against the development environment; it does not create a preview deployment. Exact command configuration and compatibility-test implementation are implementation details. Monitoring and alerting guarantees belong in [Quality and safety](quality-and-safety.md).

[Back to technical design](README.md)
