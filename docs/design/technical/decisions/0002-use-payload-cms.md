# ADR 0002: Use Payload CMS

> **Status: Accepted**
>
> **Decision state:** Payload is used as the headless CMS and owns the content-administration and editorial application boundary.

## Context

The portfolio needs more than basic page editing. Its CMS must manage an explicit relational content model, reusable content blocks, media, authentication, access control, revisions, drafts, previews, restoration, and scheduled publication. The public website remains a separate application, so the CMS must support headless use and expose content through an application-controlled service boundary.

The selected CMS should fit the TypeScript codebase, keep the application content model understandable in source code, support relational persistence, and avoid requiring the project to build a complete administration interface and editorial workflow from scratch.

### 1. Modern TypeScript ecosystem

Payload belongs to the same modern JavaScript and TypeScript ecosystem as the rest of the application. Its configuration, hooks, access controls, and extensions are written in TypeScript. The content model can therefore use the same language, package management, type checking, and development tooling as the CMS integration code.

Payload is used as a headless CMS in this architecture. Its broader application-framework capabilities do not make it responsible for public website rendering; that boundary remains with the separate React Router website under [ADR 0001](0001-separate-cms-and-public-website.md).

### 2. Declarative and visible data model

Payload expresses collections, globals, fields, relationships, blocks, access control, and lifecycle hooks through declarative, strongly typed configuration. The content schema is consequently visible in the application source instead of being distributed across opaque runtime configuration or a large plugin and entity abstraction layer.

WordPress and Drupal can represent the required content, but their extension models would make this project's schema less direct from the perspective of a TypeScript application. This is a project-specific preference for a code-first model, not a claim that those systems are incapable of implementing the use case.

Payload remains extensible through configuration, hooks, custom fields, access-control functions, and administration-interface components. The project can add domain-specific rules while retaining a recognizable declaration of the underlying content model.

### 3. Compatibility with the relational application model

The portfolio has a moderately relational content model. Pages, projects, articles, topics, series, clients, menus, forms, media, templates, and redirects have explicit and predictable relationships, but the domain does not require a graph-oriented or highly abstract relationship model.

Payload supports Cloudflare D1 through its dedicated SQLite adapter built on Drizzle ORM. Its collection and relationship model fits the selected relational direction and allows CMS data to remain in a managed relational database reached through a native Worker binding. This is compatible with the project's requirement to review and apply version-controlled database migrations.

The database and hosting choices remain separate decisions. [ADR 0005](0005-use-cloudflare-d1-for-relational-storage.md) owns the selection of D1, while this record establishes that Payload's persistence model is compatible with that decision.

### 4. Direct support for the content-management use case

Payload's built-in Blocks field directly supports the required block-composition model on the CMS side. Editors can select, order, nest, and configure declared block types without the project first building a custom block editor. The public website still owns block mapping and rendering; Payload's block representation does not prescribe the public component implementation.

Payload also provides close matches for the required editorial capabilities:

- Collections and globals for the project's content categories
- Relationship fields for the explicit content relationships
- Versions, drafts, restoration, and preview support
- Scheduled publication and unpublishing
- Authentication and configurable access control
- Upload collections and media-management support
- A generated administration interface based on the declared schema

These built-in capabilities reduce the amount of CMS infrastructure and editorial user interface that must be implemented specifically for the portfolio.

### 5. Documentation and maintainability

Payload is sufficiently documented for the project to evaluate its data model, lifecycle behaviour, extension points, database adapter, migrations, access controls, and deployment requirements. Documentation quality reduces discovery work and makes it more practical to use built-in features intentionally rather than relying on accidental framework behaviour.

## Decision

Use Payload as the headless content management system.

- Payload owns the administration interface, CMS authentication and authorization, editorial workflows, content validation, and access to CMS-managed persistence.
- Collections, globals, fields, relationships, and blocks are declared through typed Payload configuration.
- Payload's built-in block field is the CMS-side representation of composable content.
- Payload versions and drafts provide the foundation for revision history, previews, restoration, and scheduled publication.
- Payload uses its Cloudflare D1 adapter as constrained by the relational-storage decision.
- The public website does not use Payload as its renderer and does not read the CMS database directly. It accesses CMS capabilities through the service boundary defined separately.
- Project-specific invariants that Payload does not provide directly are implemented through explicit validation, hooks, access control, or surrounding application services.

Exact collection fields, administration-interface configuration, hooks, and local extensions remain implementation details governed by [Content and publishing](../content-and-publishing.md).

## Alternatives considered

### Build a custom CMS and administration interface

A custom CMS would give the project complete control over the schema, editorial workflows, and administration experience. It could use the same relational database and TypeScript stack without depending on a CMS framework.

It was not selected because the project would need to implement authentication, access control, schema-driven forms, block editing, media management, revisions, drafts, previews, and scheduled publication before delivering portfolio-specific value. Demonstrating those generic CMS facilities is not a primary project objective.

### Use WordPress or Drupal as a headless CMS

Both systems have mature administration interfaces, large ecosystems, and proven content-management capabilities. They could expose content to a separate public website.

They were not selected because their content and extension models are less direct for this code-first TypeScript project. Implementing the required schema would rely more heavily on CMS-specific entity, configuration, and plugin abstractions, while the project prefers an explicit typed model maintained alongside the application code.

### Manage content as repository files without a CMS

Version-controlled Markdown or structured files would be simple, transparent, and compatible with static or server-rendered delivery.

This was not selected because it would not satisfy the required browser-based editorial workflow, block composition, managed relationships, media library, previews, revisions, scheduled publication, and recoverable content operations.

## Consequences

Positive consequences:

- The CMS content model is declared in TypeScript and remains visible with the application code.
- The administration interface, APIs, authentication, access control, and common editorial workflows are provided by the CMS rather than built from scratch.
- The built-in Blocks field closely matches the project's content-composition requirement.
- D1, SQLite, and Drizzle compatibility fit the relational content model and selected database direction.
- Generated types and documented extension points support typed project-specific integration.
- The CMS can remain headless while the separate React Router application owns public presentation.

Negative consequences:

- The CMS becomes coupled to Payload's configuration model, hooks, administration interface, schema generation, and upgrade path.
- Payload introduces its Next.js and runtime requirements into the CMS deployment.
- Generated database changes and migrations still require review; using an ORM-backed adapter does not remove migration risk.
- Project-specific redirect, preview-token, delivery, cache-invalidation, and deletion rules still require custom design and implementation.
- Payload's block representation solves content editing, but the project must still maintain the mapping contract and public block renderer.
- Custom behaviour may become harder if future requirements conflict with Payload's lifecycle or schema abstractions.

The reduction in generic CMS work and the close fit with the content model are considered sufficient to accept this framework coupling.

## Revisit conditions

Revisit this decision if:

- Payload no longer supports the required Cloudflare Worker, D1, or media-storage deployment boundary.
- The required content schema or editorial workflows repeatedly conflict with Payload's configuration or lifecycle model.
- Payload-generated migrations cannot be reviewed or operated safely within the accepted migration process.
- Major upgrades create disproportionate maintenance work or prevent timely security updates.
- The administration interface requires enough replacement that a smaller custom CMS would be materially simpler.
- Documentation or project maintenance declines enough to make required features unsafe or impractical to operate.

## Related documentation

- [Architecture overview](../architecture-overview.md)
- [Content and publishing](../content-and-publishing.md)
- [Website delivery](../website-delivery.md)
- [Development and operations](../development-and-operations.md)
- [Functional content model](../../functional/content-model.md)
- [Functional block library](../../functional/block-library.md)
- [Functional content management](../../functional/content-management.md)
- [ADR 0001: Separate the CMS and public website](0001-separate-cms-and-public-website.md)
- [ADR 0004: Deploy on Cloudflare Workers](0004-deploy-on-cloudflare-workers.md)
- [ADR 0005: Use Cloudflare D1 for relational storage](0005-use-cloudflare-d1-for-relational-storage.md)
- [ADR 0006: Use Cloudflare R2 for object storage](0006-use-cloudflare-r2-for-object-storage.md)
- [ADR 0007: Use tRPC for website-to-CMS data access](0007-use-trpc-for-website-to-cms-data-access.md)

[Back to architecture decision records](README.md)
