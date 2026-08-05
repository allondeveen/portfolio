# Content and publishing

## Document status

- **Maturity:** Accepted
- **Scope:** Technical content boundaries, relationships, lifecycle behaviour, routing, and cross-model constraints shared by the CMS and public website.
- **Excludes:** Exact Payload fields and admin configuration, website request processing, caching, and operational procedures.
- **Prepared ADRs:** [ADR 0002](decisions/0002-use-payload-cms.md), [ADR 0005](decisions/0005-use-cloudflare-d1-for-relational-storage.md), [ADR 0006](decisions/0006-use-cloudflare-r2-for-object-storage.md), [ADR 0007](decisions/0007-use-trpc-for-website-to-cms-data-access.md), [ADR 0008](decisions/0008-use-cloudflare-cdn-caching-with-targeted-publication-invalidation.md), [ADR 0009](decisions/0009-use-turso-backed-rag-for-ai-search.md), and [ADR 0010](decisions/0010-use-single-use-tokens-for-shared-previews.md)
- **Related functional design:** [Content model](../functional/content-model.md), [block library](../functional/block-library.md), [content management](../functional/content-management.md), [public website](../functional/public-website.md), [navigation](../functional/navigation.md), and [forms](../functional/forms.md)

## Purpose

This document defines the technical content model shared by Payload CMS and the public website. It records content boundaries, relationships, lifecycle behaviour, routing, and cross-model constraints.

Exact Payload fields and admin configuration are defined during implementation.

## Model categories

### Public collections

Public collections are individually addressable.

### Taxonomies

Taxonomies organise and filter public collections.

### Supporting collections

Supporting collections perform system functions.

### Fixed templates

Fixed templates provide content for system pages. System pages respond to exceptional events that live outside the normally caputered events of the domain logic.

### Globals

Globals contain site-wide settings.

### Shared category constraints

Taxonomies, supporting collections, fixed templates, and globals do not support drafts, revisions, scheduled publication, preview, unpublishing, or routing.

## Model overview

| Model            | Kind              | Public route      | Drafts |
| ---------------- | ----------------- | ----------------- | ------ |
| Page             | Public collection | Hierarchical slug | Yes    |
| Project          | Public collection | `/projects/:slug` | Yes    |
| Article          | Public collection | `/articles/:slug` | Yes    |
| Topic            | Taxonomy          | None              | No     |
| Series           | Taxonomy          | None              | No     |
| Client           | Taxonomy          | None              | No     |
| Media            | Supporting        | None              | No     |
| Menu             | Supporting        | None              | No     |
| Forms            | Supporting        | None              | No     |
| Form submissions | Supporting        | None              | No     |
| Templates        | Supporting        | None              | No     |
| Redirects        | Supporting        | None              | No     |
| Not found        | Fixed template    | None              | No     |
| Error page       | Fixed template    | None              | No     |
| Site settings    | Global            | None              | No     |

## Shared public-content rules

These rules apply to pages, projects, and articles unless a model-specific rule says otherwise.

### Publication lifecycle

Public collections support:

- Drafts
- Revisions
- Scheduled publication
- Preview
- Unpublishing

Preview is available regardless of publication state. Drafts and unpublished changes can be scheduled. Draft content is never publicly retrievable except through preview functionality.

### Validation guarantees

Saving and publishing require schema validation. The validation requirements for saving a draft are the same as the completeness requirements for publication.

### Addressability and routing guarantees

Slugs must be unique within their routing scope. The routing scope is defined per public collection, see Model Overview for all the routing scopes. Every previously published canonical URL remains resolvable through a direct redirect after its slug changes.

### Indexing eligibility

Draft and unpublished content is never available to AI search. Detailed AI-search indexing eligibility belongs in [ADR 0009](decisions/0009-use-turso-backed-rag-for-ai-search.md).

## Routing and redirects

### Redirect rules

- Redirects are created automatically when required.
- Redirect chains must be prevented.
- Request query strings are ignored unless the redirect record explicitly specifies query-string behaviour.
- When the slug of an item of a public collection is changed, a redirect is required to resolve the old slug.
- If the slug has been changed multiple times, the original redirect must point to the new slug.
  - Each intermediate step must resolve to the new slug in one redirect.
- Before the redirects are created, the new state is validated:
  - The redirect state is normalized before validation.
  - The source location must be different from the destination location.
  - Each source location must be unique in the set of source locations.
  - The source location can't be an active public route.
  - The destination location must not be a source location in the new redirect state.
  - If the new state is invalid and the redirects are created automatically after a slug change, the public collection item can't be saved, the redirects can't be saved and the user will be notified.
  - If the new state is invalid and the redirects are created manually, the redirects can't be saved and the user will be notified.

### Hierarchical page routing

- A page may reference another page as its parent.
- Its slug is recursively derived from the parent slug and its own slug.
- Changing a parent's slug affects every descendant and creates redirects for all affected published pages.

## Model-specific rules

### Projects

- A project references topics as technologies.
- At least one technology is required; multiple technologies are allowed.
- At least one client is required; multiple clients are allowed.

### Articles

- An article references topics as subjects.
- At least one subject is required; multiple subjects are allowed.
- An article can belong to at most one series.
- Article metadata is derived for structured-data output.

### Topics

- Topics are referenced by articles and projects.
- A topic can reference another topic as its parent.
- Filtering on a parent includes content assigned to descendant topics.
- Filtering on a child includes only content assigned to that child.
- Filtering with multiple topics increases specificity of the query, meaning the results must include all those topics.

### Series

Series apply only to articles.

### Clients

Clients apply only to projects.

### Form submissions

Form submissions store the field schema with the provided values of a form definition. This happens after submission. Form submissions with private data are subject to a retention period.

### Fixed templates

Every fixed template must be configured. A missing required template produces an error state.

## Content relationships

### Article-series relationship

- A series contains an ordered list of article references.
- An article can belong to at most one series.
- Navigation from a series to an article is virtual; the relationship is stored on the article.
- The virtual reference stores the order in the join table.
- Removing membership deletes neither the series nor the article.
- Deleting an article removes its membership without deleting the series.
- Public queries omit unpublished member articles while retaining the order of the published members.

## Supporting models

### Media

Media stores custom images and files uploaded through the CMS and hosted on Cloudflare R2.

### Menu

Menus define global navigation.

- Menus are single-level.

### Forms

Forms define the data visitors can submit to the portfolio owner.

- Submitted data is stored as a form submission.

### Templates

Templates provide reusable content across public collections.

- Header is a required template.
- Footer is a required template.
- Required templates should be seeded.

### Redirects

Redirects map requests to other locations.

## Content blocks

The following models contain an ordered set of content blocks:

- Page
- Project
- Article
- Templates
- Not found
- Error page

### General content block rules

- Content blocks come in two kinds: atomic blocks and composed blocks. Atomic blocks render primitive content and composed blocks render other blocks. Nesting is allowed in composed blocks.
- Only one table of contents block is allowed, also when included through a template.
- Only one series table of contents block is allowed, also when included through a template.
- Media, menus, forms, taxonomies and public collections may be referenced through the block's fields.
- The following blocks reference or derive data that is resolved during server-side delivery mapping. Their mapped output is static:
  - Image
  - Embedded video
  - File download
  - Icon
  - Related articles
  - Related projects
  - Article reference
  - Table of contents
  - Series table of contents
  - Series pagination
  - Menu
  - Site title
  - Form
  - Template
- Every mapped content block is static. The route-specific AI interface is client-side and dynamic but is not a content block, as defined by [ADR 0009](decisions/0009-use-turso-backed-rag-for-ai-search.md).
- The following blocks contain authored data:
  - Rich text
  - Heading
  - Quote
  - List item
  - Label
  - Code
  - Table
  - Metric
  - Hero
  - Text section
  - Text with media
  - Callout
  - Chapter
  - Button
  - Call-to-Action
  - Contact
- The following blocks are composed blocks:
  - Grid
  - Stack
  - Container
  - Group
  - List
  - Gallery
  - Icons
  - Hero
  - Text section
  - Text with media
  - Callout
  - Chapter
- Block intances don't have stable identifiers.
- Block types have stable identifiers.
- A change in a block will create a new revision. They won't be published until the author explicitly publishes them or after the scheduled publicatoin date. They can be previewed.

### Model specific block rules

**Page, project and article models**

The following blocks are allowed to be inserted directly:

- Hero
- Text section
- Text with media
- Chapter
- Related articles
- Related projects
- Table of contents
- Series table of contents
- Series pagination
- Call-to-Action
- Contact
- Form

The following blocks are not allowed at all, including in nested blocks:

- Menu

There are nesting rules per block. See Website Delivery for more information about that.

Other rules:

- The hero block is required and must be the first block in the set of content blocks, except for the Page assigned to the `/search` route.
- The `/search` Page is managed through the normal Pages collection and does not contain a Hero. Its route composes the Page's introductory content with the AI interface outside the content-block set.
- Multiple chapter blocks are allowed.

### Block data validation

- See the Block Library in the Functional Design for the required fields of the blocks and the validation rules.
- Template
  - Template name is required.
  - Template name can't be `header` or `footer`.

[Back to technical design](README.md)
