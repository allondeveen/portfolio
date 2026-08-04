# Architecture overview

## Document status

- **Maturity:** Accepted
- **Scope:** Application components, deployment boundaries, hosting services, technical dependencies, and high-level system interactions.
- **Excludes:** Detailed content schemas, request processing, caching, quality controls, and operational procedures.
- **Prepared ADRs:** [ADR 0001](decisions/0001-separate-cms-and-public-website.md), [ADR 0002](decisions/0002-use-payload-cms.md), [ADR 0003](decisions/0003-use-react-router-framework.md), [ADR 0004](decisions/0004-deploy-on-cloudflare-workers.md), [ADR 0005](decisions/0005-use-cloudflare-d1-for-relational-storage.md), [ADR 0006](decisions/0006-use-cloudflare-r2-for-object-storage.md), [ADR 0007](decisions/0007-use-trpc-for-website-to-cms-data-access.md), and [ADR 0009](decisions/0009-use-turso-backed-rag-for-ai-search.md)
- **Related functional design:** [Functional design overview](../functional/README.md), [public website](../functional/public-website.md), and [content management](../functional/content-management.md)

## Purpose

This document describes the components that make up the application and the strategy used to host them.

## Components

The application has two primary product components, deployed separately: the content management system and the public website. A separate maintenance Worker provides a visitor-facing response while maintenance mode is active. The rationale for separating the CMS and website belongs in [ADR 0001](decisions/0001-separate-cms-and-public-website.md).

### Content management system

Content management is implemented with Payload CMS. The rationale for this choice belongs in [ADR 0002](decisions/0002-use-payload-cms.md).

### Website

The public website is separate from Payload CMS and is built with React Router Framework. The rationale for the framework choice belongs in [ADR 0003](decisions/0003-use-react-router-framework.md).

### Maintenance mode

A separate Worker serves the maintenance-mode page without depending on the CMS or website Worker. Cloudflare activates maintenance mode before a deployment and routes all application traffic to this Worker while maintenance mode is active. Normal routing is restored only after a successful deployment; a failed deployment and its rollback leave maintenance mode active.

## Hosting strategy

### Application components

The primary application components are hosted on Cloudflare Workers:

- CMS worker
- Website worker
- Maintenance worker

The rationale for this hosting choice belongs in [ADR 0004](decisions/0004-deploy-on-cloudflare-workers.md).

### Dependencies

Cloudflare Workers do not provide conventional Node.js environments, so compatible dependencies are required.

- Cloudflare D1 stores Payload-managed relational CMS data through a native Worker binding. The rationale belongs in [ADR 0005](decisions/0005-use-cloudflare-d1-for-relational-storage.md).
- Turso stores the derived AI-search chunks, metadata, full-text index, and vector embeddings separately from authoritative D1 content. Staging and production use Turso Cloud; development uses local embedded libSQL. The complete rationale and RAG architecture remain owned by [ADR 0009](decisions/0009-use-turso-backed-rag-for-ai-search.md).
- Cloudflare R2 stores uploaded files. The rationale for using R2 belongs in [ADR 0006](decisions/0006-use-cloudflare-r2-for-object-storage.md).
- D1 Time Travel retains 30 days of recovery history. Before a migration, GitHub Actions stores the current bookmark ID and uses it to restore the pre-migration state automatically if the release fails after migration processing begins.
- GitHub Actions executes coordinated deployments, Payload migrations, automated recovery, and manually triggered long-running migrations.

### Portfolio

Visitors access the public website during normal operation. While maintenance mode is active, Cloudflare routes application traffic to the maintenance Worker until a deployment succeeds. A failed deployment, rollback, recovery workflow, or separately applied long-running migration does not restore normal routing. The website retrieves public content from Payload CMS and loads images and files from R2 media storage.

Content editors use Payload CMS to edit content stored in D1. Editors upload files through Payload, which stores them in R2 media storage.

### Agentic search

Visitors access AI search through the public website. Its complete architecture is defined by [ADR 0009](decisions/0009-use-turso-backed-rag-for-ai-search.md).

[Back to technical design](README.md)
