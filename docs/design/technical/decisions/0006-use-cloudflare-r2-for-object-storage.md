# ADR 0006: Use Cloudflare R2 for object storage

> **Status: Accepted**
>
> **Decision state:** Cloudflare R2 stores uploaded public media. D1 migration recovery uses native Time Travel rather than R2.

## Context

The CMS and website execute in Cloudflare Workers. Workers provide an ephemeral virtual filesystem, but files written during one request do not persist across requests or Worker instances. Uploaded images and documents therefore require durable storage outside the request-serving runtime.

The CMS must accept images and PDF documents, retain them independently from Worker deployments, allow editors to reuse them, and make public media available to the website. The database should own media records, relationships, and metadata, while storage optimized for unstructured binary objects owns the file bytes.

The previous PostgreSQL design also selected a private R2 bucket for `pg_dump` files. That mechanism does not apply after selecting D1. Native D1 Time Travel now owns migration recovery, so this ADR selects R2 only for public media and does not introduce a private database-backup bucket.

### 1. Durable object storage for an ephemeral runtime

R2 is object storage rather than block storage or a mounted filesystem. Objects are addressed by keys and accessed through Worker bindings or an S3-compatible API. This model fits uploaded media, which needs durable byte storage but does not require a process-local filesystem or random block-device access.

Using object storage keeps persistent files outside ephemeral Worker instances. Deploying, restarting, relocating, or replacing the CMS Worker does not remove the stored media.

### 2. Payload and Worker integration

Payload provides an R2 storage adapter for Cloudflare Workers. The CMS can pass a native R2 bucket binding to that adapter instead of implementing a custom upload backend or attempting to persist uploads to the Worker's temporary filesystem.

Payload and D1 retain the media record, descriptive metadata, relationships, and editorial state. R2 stores the associated file bytes. This boundary allows content records to reference stable object locations while preventing large binary content from becoming part of the relational content model.

Because the record and object live in different systems, a failed multi-step operation can create an orphaned record or object. Upload, replacement, and deletion behaviour must detect or reconcile those partial outcomes; selecting R2 does not make the cross-system operation transactional.

### 3. Public media delivery

Public media is served directly from R2 through `https://media.allondeveen.com`. Images use the `/images/` namespace, and downloadable files use `/downloads/`. The public website references those URLs rather than proxying file bytes through the website or CMS Worker.

R2 is integrated with Cloudflare's network, but the underlying object storage is not assumed to be physically co-located with every visitor or Worker invocation. Bucket placement, request origin, and access patterns still affect an uncached read.

The custom media domain allows eligible public objects to use Cloudflare's cache. A cache hit can serve media from an edge location near the visitor without retrieving the object from its storage region. This caching layer, rather than universal object replication to every edge, provides the near-visitor delivery benefit.

Caching also relaxes what visitors observe after an object is overwritten or deleted. An older object or cached not-found response may remain visible until it expires or is purged. Public media key management and cache invalidation must therefore prevent stale or incorrectly missing media; exact cache rules, key construction, and purge implementation remain delivery details.

### 4. Cloudflare platform fit

R2 fits the existing Cloudflare hosting boundary. Payload can write through a Worker binding, browsers can retrieve public objects through a Cloudflare custom domain, and Cloudflare's caching and traffic controls can be applied without introducing a separate CDN.

This consolidation is operationally convenient but increases Cloudflare service concentration. Workers, D1, application routing, response caching, public media, and other traffic controls can be affected by one provider-wide incident, account problem, or configuration error.

### 5. Media trust boundary

The media bucket contains only images and downloads intended to be publicly addressable. It is exposed through `media.allondeveen.com` and must never contain sensitive or private files.

Database recovery data is not stored in this bucket. D1 Time Travel owns migration recovery and remains separate from the public-media trust boundary.

Development, staging, and production use separate R2 media resources under the accepted environment-isolation rules. Reusing R2 as the provider does not permit public media delivery or one environment to cross these bucket boundaries.

## Decision

Use Cloudflare R2 as the application's public-media object-storage service.

- Store images and PDF documents uploaded through Payload in an environment-specific media bucket.
- Use Payload's R2 storage adapter and a native Worker bucket binding for CMS media operations.
- Keep media records and relationships in D1 while storing the corresponding file bytes in R2.
- Expose only the public media bucket through `https://media.allondeveen.com`.
- Use `/images/` for image object URLs and `/downloads/` for downloadable-file URLs.
- Allow public media served through the custom domain to benefit from Cloudflare edge caching without treating the underlying bucket as universally edge-local.
- Keep sensitive and private files out of public media storage.
- Treat image resizing, focal-point processing, format conversion, and other media transformations as processing concerns rather than R2 storage capabilities.

Exact bucket names, object-key construction, cache rules, cache lifetimes, purge calls, multipart-upload configuration, and binding names remain implementation details governed by the technical design and environment configuration.

## Alternatives considered

### Store files on the Worker filesystem

The Worker virtual filesystem could support temporary processing during an individual request and would resemble the local-file behaviour used by conventional server deployments.

It was not selected for persistence because its writable storage is request-scoped and ephemeral. Uploaded media would not survive across requests or Worker instances.

### Store file bytes in the relational database

Images and documents could be stored as binary database values. This would keep records and bytes in one database technology and could make some record-to-file operations transactional.

It was not selected because large unstructured objects would increase database size, backup volume, database traffic, and recovery work. It would also make public media delivery depend on an application and database request instead of using object storage and a public asset domain.

### Use an external S3-compatible object-storage provider

Another object-storage service could provide durable media storage while reducing dependence on Cloudflare. An S3-compatible API could be integrated with Payload through an appropriate adapter.

It was not selected because it would add another provider, credential boundary, storage integration, and likely a separate delivery or CDN configuration. R2's native Worker binding, Payload adapter, custom-domain delivery, and Cloudflare cache fit the already selected platform with less infrastructure glue.

### Use a specialized image-delivery service

A specialized service such as Cloudflare Images could provide image transformation, responsive variants, and image-specific delivery features.

It was not selected as the object-storage foundation because the project also stores PDF downloads. The current requirements do not justify adding a separate image platform; image processing can be reconsidered independently if the required transformations become difficult or inefficient.

## Consequences

Positive consequences:

- Uploaded files persist independently from ephemeral Worker instances and application deployments.
- Payload can store uploads through an official R2 adapter and native Worker binding.
- Public media can be delivered directly without consuming website or CMS request capacity.
- The custom media domain can use Cloudflare's edge cache to serve eligible objects near visitors.
- Media, application hosting, relational storage, caching, and traffic controls share one operational platform and require less cross-provider integration.
- Separate environment-specific media buckets preserve the public-media trust boundary.

Negative consequences:

- The architecture becomes more dependent on Cloudflare's availability, account state, limits, pricing, and configuration.
- One Cloudflare incident can affect application Workers, D1, public media, and cache behaviour simultaneously.
- R2 storage is not universally edge-local; an uncached read can still incur latency to the object's storage region.
- Cached public objects, overwritten keys, deletions, and cached not-found responses require deliberate expiry or purge behaviour.
- Media records and R2 objects cannot be updated atomically, creating possible orphaned records or objects after partial failure.
- Publicly addressable media creates a disclosure risk if a sensitive file is uploaded to the public bucket.
- R2 does not itself provide image editing, focal-point processing, responsive variants, or format conversion.
- Moving to another provider would require changes to Payload storage integration, Worker bindings, public media delivery, caching, and credentials.

The durable Worker-compatible storage, direct Payload integration, public delivery model, and reduction in infrastructure glue are considered sufficient to accept this provider concentration and the object-storage consistency boundary.

## Revisit conditions

Revisit this decision if:

- Private or access-controlled media becomes a requirement that the current public-media boundary cannot support safely.
- Repeated partial upload or deletion failures make reconciliation between Payload records and R2 objects unreliable.
- Media caching produces unacceptable stale, missing, or inconsistent public assets.
- Required image transformation or delivery behaviour makes a specialized media service materially simpler or more effective.
- R2 availability, regional placement, limits, pricing, or performance no longer meets the project.
- Cloudflare service concentration becomes unacceptable after an incident or a change in availability requirements.

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
- [ADR 0005: Use Cloudflare D1 for relational storage](0005-use-cloudflare-d1-for-relational-storage.md)

[Back to architecture decision records](README.md)
