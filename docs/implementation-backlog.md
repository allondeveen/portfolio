# Implementation backlog

This file translates the accepted content strategy, functional design, technical design, and ADRs into issue-sized implementation tasks. Each `###` section is intended to become one GitHub issue. Tasks describe required outcomes and already accepted implementation boundaries; exact field configuration, component APIs, styling, and other local choices remain implementation details unless stated otherwise.

## How to use this backlog

- Preserve the task ID in the GitHub issue title or body so dependencies remain traceable.
- Use the suggested labels as GitHub labels or project-board fields.
- A task marked **Deferred** or **Blocked** is not ready for initial-release implementation without resolving its stated prerequisite.
- Split an issue further only when the resulting issues can be completed and verified independently without losing the requirements recorded here.
- Source documents remain authoritative if this execution-oriented summary and a design document ever diverge.

The backlog contains 114 issue candidates: 8 foundation, 19 model, 39 current-block, 7 CMS/publishing capability, 11 website, 8 AI, 12 operations/quality, 5 launch-content, and 5 deferred/future tasks.

Recommended dependency order is Foundations → Models → Blocks → CMS/website/AI capabilities → Operations and release verification → Launch content. Operations work that establishes development environments, security controls, or CI can proceed alongside Models and Blocks.

## Shared definition of done

Unless a task narrows the scope, applicable work is complete only when:

- Runtime inputs and service-boundary data are validated, and untrusted output is escaped for its destination.
- CMS-backed data is represented in Payload, mapped by the CMS into the shared CMS-agnostic domain model, and rendered by the website without exposing Payload types.
- Content-block work includes the Payload authoring definition, domain representation, CMS adapter, website renderer, allowed nesting, and validation.
- Visitor-facing work supports Baseline Widely Available browsers, touch and keyboard operation, mobile, tablet, desktop, and wide-desktop layouts, WCAG 2.2 AA, and automated overflow checks.
- Static content is server-rendered. Only the AI-search interface is client-side and dynamic.
- Unknown block types are ignored safely during server mapping; missing required templates and other failures follow the accepted degraded-behaviour rules.
- Relevant unit, integration, rendering, accessibility, and failure-path tests are included.
- Secrets and environment-specific values stay in hosting configuration or environment variables, outside source code.

## Epic A — Application and platform foundations

### FND-001 — Establish the monorepo application boundaries

**Labels:** `foundation`, `architecture`

**Requirements:** Provide separate CMS and public-website applications plus shared packages; browsers must never call the protected CMS interface directly.

**Accepted decisions:** The CMS and website are separate Cloudflare Workers, built from one monorepo revision and released together. React Router Framework owns website routing; Payload owns CMS administration. A separate maintenance Worker is required.

**Acceptance:** Each Worker builds independently from the same repository, shared packages have explicit ownership, and no website module imports Payload configuration.

**Sources:** [ADR 0001](design/technical/decisions/0001-separate-cms-and-public-website.md), [ADR 0003](design/technical/decisions/0003-use-react-router-framework.md), [ADR 0004](design/technical/decisions/0004-deploy-on-cloudflare-workers.md)

### FND-002 — Configure Payload CMS with Cloudflare D1

**Labels:** `foundation`, `cms`, `database`

**Requirements:** Run Payload as the authoritative CMS with relational persistence for content, revisions, drafts, schedules, relationships, redirects, and submissions.

**Accepted decisions:** Use the Payload D1 adapter and Cloudflare D1 rather than PostgreSQL. Payload configuration is the schema source of truth; committed Payload migrations govern staging and production.

**Acceptance:** The CMS reads and writes representative content and revisions in D1, generates migrations, and does not rely on PostgreSQL-only behaviour.

**Sources:** [ADR 0002](design/technical/decisions/0002-use-payload-cms.md), [ADR 0005](design/technical/decisions/0005-use-cloudflare-d1-for-relational-storage.md)

### FND-003 — Configure R2 media storage and public delivery

**Labels:** `foundation`, `media`, `cloudflare`

**Requirements:** Persist uploaded images and downloads outside the Worker filesystem and make public assets reusable by CMS content.

**Accepted decisions:** Use Cloudflare R2. Serve images at `https://media.allondeveen.com/images/` and downloads at `https://media.allondeveen.com/downloads/`; the bucket contains only public media.

**Acceptance:** Upload, replacement, retrieval, and deletion work through Payload and the configured public URLs without storing bytes in D1 or Worker storage.

**Sources:** [ADR 0006](design/technical/decisions/0006-use-cloudflare-r2-for-object-storage.md), [Website delivery](design/technical/website-delivery.md#media-delivery-boundary)

### FND-004 — Set up the shared CMS-agnostic domain contract

**Labels:** `foundation`, `setup`, `domain-model`, `typescript`

**Requirements:** Create the shared package and establish the conventions and extension points through which serializable content, block, template, pagination, filtering, and failure contracts can be added. Define the common block discriminant, shared base types where genuinely useful, runtime-schema conventions, exports, and contract-testing utilities. Do not implement the complete domain model in this issue.

**Accepted decisions:** The shared domain model must not depend on Payload collections, generated persistence types, or React components. Runtime schemas validate every Worker boundary. Each model and block issue owns its concrete domain type and runtime schema.

**Acceptance:** CMS and website applications can depend on the shared package without importing one another; a minimal representative contract proves type exports and runtime validation; and documented conventions show how later model and block issues register their own contracts.

**Sources:** [ADR 0007](design/technical/decisions/0007-use-trpc-for-website-to-cms-data-access.md#domain-model-and-ownership)

### FND-005 — Set up the CMS-to-domain adapter layer

**Labels:** `foundation`, `setup`, `cms`, `mapping`

**Requirements:** Create the CMS adapter infrastructure used to transform Payload records into the shared domain representation. Establish adapter interfaces, block-adapter registration and dispatch, shared mapping context, validation/error handling, and adapter test utilities. Do not implement every collection or block adapter in this issue.

**Accepted decisions:** The CMS owns all Payload-to-domain mapping. Each model and block issue owns its concrete adapter. The shared mapping context must be able to enforce the maximum relationship depth of two; related public content maps only Hero data and public URL and does not recurse.

**Acceptance:** A representative adapter can be registered, invoked, validated, and tested; unknown block discriminants are omitted safely; mapping failures have a defined result; and later issues can add adapters without changing the dispatch architecture.

**Sources:** [ADR 0007](design/technical/decisions/0007-use-trpc-for-website-to-cms-data-access.md#relationship-resolution)

### FND-006 — Set up the shared website block renderer

**Labels:** `foundation`, `setup`, `website`, `renderer`

**Requirements:** Create the website renderer infrastructure used by pages, projects, articles, templates, system pages, and supported generated content within AI responses. Establish component registration and dispatch, common rendering context, composition conventions, unknown-block behaviour, error boundaries, and renderer test utilities. Do not implement every block component in this issue.

**Accepted decisions:** The website owns domain-to-component rendering. Each block issue owns its concrete component and registration. All content blocks are static. The client-side AI interface is a separate route component, not a block. Rendering failures use an error boundary and an independent fallback.

**Acceptance:** A representative block component can be registered and rendered through the shared dispatch boundary; unknown types do not crash a page; the error boundary and independent fallback are testable; and later block issues can add renderers without changing the dispatch architecture.

**Sources:** [Website delivery](design/technical/website-delivery.md#content-blocks), [Quality and safety](design/technical/quality-and-safety.md#accessibility)

### FND-007 — Implement the protected tRPC integration

**Labels:** `foundation`, `trpc`, `integration`

**Requirements:** Expose protected `content`, `previews`, and `form-submission` procedures from the CMS and typed server-side clients in the website.

**Accepted decisions:** The CMS resolves content and returns the requested representation with header, footer, not-found, and error templates. The website never reads D1 directly. Procedure timeouts are 5 seconds for content/previews and 10 seconds for form submission; cancellation propagates where possible and there are no general retries.

**Acceptance:** All documented website routes call the appropriate procedure, validate inputs and outputs, map stable outcomes to the specified HTTP behaviour, and preserve trace context.

**Sources:** [ADR 0007](design/technical/decisions/0007-use-trpc-for-website-to-cms-data-access.md#trpc-procedure-surface)

### FND-008 — Implement CMS service authorization

**Labels:** `foundation`, `security`, `oauth`

**Requirements:** Protect every tRPC procedure with service authentication without exposing credentials to visitors.

**Accepted decisions:** The CMS exposes conventional `POST /oauth/token/`; Client Credentials uses fixed `website-downstream` scope. Tokens are five-minute HS256 JWTs signed with `jose`, with exact configured issuer/audience and 30-second clock skew. Credentials and a random 256-bit signing key are externally generated and manually rotated.

**Acceptance:** Token endpoint responses and protected-procedure errors match ADR 0007, use `no-store`, and the website performs only the one allowed expired-token recovery sequence within the 9/14-second pipeline budgets.

**Sources:** [ADR 0007](design/technical/decisions/0007-use-trpc-for-website-to-cms-data-access.md#authorization-service)

## Epic B — CMS collections, taxonomies, supporting models, and globals

### MOD-001 — Implement the Pages collection

**Labels:** `cms-model`, `public-content`, `pages`

**Requirements:** Fields: generated ID, title, unique routing-scope slug, derived read-only summary, ordered content blocks, optional parent, SEO fields, publication state, and optional publication date. Support drafts, revisions, scheduling, preview, unpublishing, and hierarchical pages; the `/` homepage cannot be unpublished or deleted. The Page assigned to `/search` supplies the initial agentic-search content through this collection.

**Accepted decisions:** A required first Hero normally supplies the sole `h1` and non-empty introduction; the plain-text introduction becomes the summary and default SEO description. The `/search` Page is the explicit exception: it renders the normal header and Page content without a Hero or derived summary and is delivered through the special uncached `/search` route. Parent plus own slug creates the hierarchical route. A published slug/path change creates direct redirects for all affected descendants.

**Acceptance:** Schema, validation, admin views, lifecycle hooks, routing adapter, summary derivation, and homepage invariants are covered.

**Sources:** [Functional content model](design/functional/content-model.md#pages), [Content and publishing](design/technical/content-and-publishing.md#hierarchical-page-routing)

### MOD-002 — Implement the Projects collection

**Labels:** `cms-model`, `public-content`, `projects`

**Requirements:** Inherit page fields except parent; require one or more technology Topics and one or more Clients. Support the complete public-content lifecycle and `/projects/:slug`.

**Accepted decisions:** Technologies use Topic IDs. Only published projects appear in overviews, featured/selected results, relationships, and AI search. Project summaries and cards derive from Hero data.

**Acceptance:** Project editing, relations, publication validation, adapter output, routing, overview eligibility, and structured shared post-content work.

**Sources:** [Functional content model](design/functional/content-model.md#projects), [Project page](content-strategy/page-definitions.md#project-page)

### MOD-003 — Implement the Articles collection

**Labels:** `cms-model`, `public-content`, `articles`

**Requirements:** Inherit page fields except parent; require one or more subject Topics and allow at most one Series. Support `/articles/:slug`, drafts, revisions, schedules, previews, and publication.

**Accepted decisions:** Series order is stored on the article relationship/join; public series queries omit unpublished members without changing remaining order. Articles produce required structured data and supply before/after shared content.

**Acceptance:** Article editing, relations, series order, routing, metadata derivation, AI eligibility, and article layout data work.

**Sources:** [Functional content model](design/functional/content-model.md#articles), [Article-series relationship](design/technical/content-and-publishing.md#article-series-relationship)

### MOD-004 — Implement the Topics taxonomy

**Labels:** `cms-model`, `taxonomy`, `filtering`

**Requirements:** Fields: generated ID, name, optional parent Topic. Topics classify articles and projects and are immediately available without drafts or routes.

**Accepted decisions:** Filters compare stable IDs. Parent filtering includes descendants; child filtering excludes parents and siblings; repeated `topics` values use AND semantics and run before pagination.

**Acceptance:** Cycles are prevented, hierarchy queries work, editors can select Topics, and article/project filters return correct totals.

**Sources:** [Functional content model](design/functional/content-model.md#topics), [ADR 0007 filtering](design/technical/decisions/0007-use-trpc-for-website-to-cms-data-access.md#collection-filtering)

### MOD-005 — Implement the Series taxonomy

**Labels:** `cms-model`, `taxonomy`, `articles`

**Requirements:** Fields: generated ID and title, with a virtual ordered list of member Articles. Series have no route, drafts, revisions, or preview.

**Accepted decisions:** Membership is stored on Articles; one Article belongs to at most one Series. Removing membership deletes neither record; deleting an Article removes membership.

**Acceptance:** Editors can manage membership/order and public queries expose only published members in stable order.

**Sources:** [Series](design/functional/content-model.md#series), [Article-series relationship](design/technical/content-and-publishing.md#article-series-relationship)

### MOD-006 — Implement the Clients taxonomy

**Labels:** `cms-model`, `taxonomy`, `projects`

**Requirements:** Fields: generated ID and name. Clients relate many-to-many with Projects and have no public page or draft lifecycle.

**Accepted decisions:** At least one Client is required for each Project; client context is authored in project content rather than automatically rendered.

**Acceptance:** Editors can manage Clients and project relationships without creating public Client routes.

**Sources:** [Clients](design/functional/content-model.md#clients)

### MOD-007 — Implement the Media collection

**Labels:** `cms-model`, `media`, `r2`

**Requirements:** Manage generated ID, name, file, derived type, required alternative text, optional caption, and required credits when applicable. Accept images and PDFs; support search, filtering, reuse, image resizing, and focal point.

**Accepted decisions:** Store bytes in R2. Replacing an asset updates all uses; deletion warns but is not blocked and removes published uses. Media is immediately public and has no draft lifecycle.

**Acceptance:** Upload and authoring validation, R2 storage, public URL mapping, replacement, search/filter, and deletion behaviour work.

**Sources:** [Media](design/functional/content-model.md#media), [Media library](design/functional/content-management.md#media-library)

### MOD-008 — Implement the Menus collection

**Labels:** `cms-model`, `navigation`

**Requirements:** Manage generated menu IDs and ordered items with ID, label, internal resource or complete external URL, and index. Empty menus are omitted.

**Accepted decisions:** Delivered menus are single-level even though the functional field model contains a parent field. Items whose internal destination is not public are omitted. External links open in a new tab. Menu changes purge all cached website HTML.

**Acceptance:** Editors can create header/footer menus and the mapper produces accessible, ordered, public-eligible items.

**Sources:** [Menu model](design/functional/content-model.md#menu), [Global navigation](design/functional/navigation.md#global-navigation)

### MOD-009 — Implement the Forms collection

**Labels:** `cms-model`, `forms`

**Requirements:** Manage generated ID, title, settings, ordered fields, post-submission block messages, and notification definitions. Support text, textarea, options, checkbox, file, select, number, boolean, and range fields with labels and option label/value pairs.

**Accepted decisions:** Forms have no draft lifecycle and are referenced by Form blocks. Form changes invalidate public pages using them.

**Acceptance:** Editors can construct and validate reusable forms, and the domain adapter supplies a renderer-safe form contract. Submission processing is tracked separately in CAP-007.

**Sources:** [Forms model](design/functional/content-model.md#forms)

### MOD-010 — Implement the Form submissions collection

**Labels:** `cms-model`, `forms`, `private-data`

**Requirements:** Store immutable generated ID, source Form, submitted field schema and values, and uploaded files. Only authenticated CMS administrators may view submissions; they are never public or available to non-production environments.

**Accepted decisions:** Sensitive/personal values never appear in public output or logs. The functional requirement is 30-day retention.

**Acceptance:** System-only creation, immutable records, CMS-only access, schema snapshotting, and environment isolation are enforced. Automated retention and notification workflow remain blocked by DEF-001 in the risk log.

**Sources:** [Form submissions](design/functional/content-model.md#form-submissions), [DEF-001](design/technical/risks-and-deferrals.md#deferral-log)

### MOD-011 — Implement the Redirects collection and invariant validation

**Labels:** `cms-model`, `routing`, `redirects`

**Requirements:** Manage generated ID, source, destination, active state, and optional explicit query-string behaviour. Support automatic redirects on public slug changes and manual editor-managed redirects.

**Accepted decisions:** Normalize before validation; source differs from destination, sources are unique, source is not an active route, and no destination is another source. Every old/intermediate URL points directly to the newest URL. Invalid automatic state blocks both content and redirect saves. Redirects run before routing and are permanent; query strings are ignored unless configured.

**Acceptance:** Manual and automatic paths enforce the same invariants, descendant page moves create redirects, and no chain or loop can be saved.

**Sources:** [Redirect rules](design/technical/content-and-publishing.md#redirect-rules)

### MOD-012 — Implement reusable Templates

**Labels:** `cms-model`, `templates`

**Requirements:** Provide reusable ordered block compositions referenced during content mapping. A template name is required and custom templates cannot use `header` or `footer`.

**Accepted decisions:** Templates are supporting content without drafts, routes, revisions, or previews. Header and footer are required and should be seeded.

**Acceptance:** Templates can be authored, resolved server-side, mapped statically, and missing optional templates do not stop delivery.

**Sources:** [Supporting templates](design/technical/content-and-publishing.md#templates)

### MOD-013 — Implement Header and Footer singular content

**Labels:** `cms-model`, `template`, `global-layout`

**Requirements:** Provide one required header and one required footer, each with ordered allowed content blocks. Header contains site identity, primary single-level menu, and optional action; footer contains copyright/privacy navigation.

**Accepted decisions:** Both are included with every content/preview response and changes purge all cached website HTML. A missing header causes the error path; required templates are seeded.

**Acceptance:** CMS editing, block restrictions, seed data, domain mapping, responsive rendering, and accessible navigation work.

**Sources:** [Global elements](content-strategy/content-model.md#global-elements), [Templates](design/functional/content-model.md#header-and-footer)

### MOD-014 — Implement Project after-content singular content

**Labels:** `cms-model`, `template`, `projects`

**Requirements:** Provide optional ordered blocks rendered after every public Project and before the footer. Intended content includes related projects, projects-overview action, and Contact.

**Accepted decisions:** Shared template content is mapped statically and changes invalidate all affected cached project pages.

**Acceptance:** Editors can configure the region and every project detail composes it after authored content without duplicating it in project records.

**Sources:** [Project page after-content](design/functional/content-model.md#project-page-after-content-blocks)

### MOD-015 — Implement Article before-content singular content

**Labels:** `cms-model`, `template`, `articles`

**Requirements:** Provide optional ordered blocks after an Article Hero and before authored content, primarily page and Series tables of contents.

**Accepted decisions:** Only one Table of contents and one Series table of contents may occur after authored and template blocks are combined.

**Acceptance:** Article rendering composes and validates the region in the required position.

**Sources:** [Article before-content](design/functional/content-model.md#article-page-before-content-blocks)

### MOD-016 — Implement Article after-content singular content

**Labels:** `cms-model`, `template`, `articles`

**Requirements:** Provide optional ordered blocks after authored Article content and before the footer, including related articles, overview action, Contact, and Series pagination.

**Accepted decisions:** Shared content is statically mapped and refreshed from current eligible relationships.

**Acceptance:** Article rendering composes the region once and omits unavailable relationship blocks gracefully.

**Sources:** [Article after-content](design/functional/content-model.md#article-page-after-content-blocks)

### MOD-017 — Implement the Not-found fixed template

**Labels:** `cms-model`, `system-page`, `errors`

**Requirements:** Required title and ordered blocks explain that a resource is unavailable and link to the homepage.

**Accepted decisions:** Unknown, malformed, missing, draft, and publicly ineligible content produce HTTP 404 without disclosing record existence. The normal renderer, header, and footer are used.

**Acceptance:** The configured template renders for every 404 path and is included in CMS content responses.

**Sources:** [Not found](design/functional/content-model.md#not-found), [Unknown routes](design/technical/website-delivery.md#unknown-routes)

### MOD-018 — Implement the Error-page fixed template and independent fallback

**Labels:** `cms-model`, `system-page`, `errors`

**Requirements:** Required title and ordered blocks communicate an unresolved error.

**Accepted decisions:** All unclassified failures render this page with the appropriate status; an error boundary catches rendering failures, and a code-owned fallback works if the error page itself cannot render or the CMS is unavailable.

**Acceptance:** Error content is CMS-managed where available, the fallback has no CMS dependency, and both paths are integration-tested and logged.

**Sources:** [Error page](design/functional/content-model.md#error-page), [Rendering failures](design/technical/website-delivery.md#rendering-failures)

### MOD-019 — Implement Site settings

**Labels:** `cms-model`, `global`, `seo`

**Requirements:** Store required site title, valid support email, and social image. The support address differs from contact-form notification recipients and any Contact-block address.

**Accepted decisions:** Site settings are a global without drafts, routes, revisions, or preview. Site title is exposed through the domain contract; secrets do not belong here.

**Acceptance:** CMS validation enforces the email rules and website metadata/blocks consume the settings.

**Sources:** [Site settings](design/functional/content-model.md#site-settings)

## Epic C — Individual content blocks

### BLK-001 — Implement Grid

**Labels:** `block`, `layout`

**Requirements:** Required non-empty children, optional child spans from 1–12, ordered left-to-right; adapt without changing content order.

**Implementation:** Composed static block using a twelve-column layout; validate every span and prevent overflow across supported viewports.

**Sources:** [Grid](design/functional/block-library.md#grid)

### BLK-002 — Implement Stack

**Labels:** `block`, `layout`

**Requirements:** Render at least one child vertically in authored order, especially inside Grid.

**Implementation:** Composed static block with no content reordering.

**Sources:** [Stack](design/functional/block-library.md#stack)

### BLK-003 — Implement Container

**Labels:** `block`, `layout`

**Requirements:** Centre a required non-empty set of child blocks while preserving order.

**Implementation:** Composed static layout primitive; width and spacing are renderer details.

**Sources:** [Container](design/functional/block-library.md#container)

### BLK-004 — Implement Group

**Labels:** `block`, `layout`

**Requirements:** Group a required non-empty set of child blocks without imposing presentation.

**Implementation:** Composed static semantic/structural wrapper.

**Sources:** [Group](design/functional/block-library.md#group)

### BLK-005 — Implement Rich text

**Labels:** `block`, `text`

**Requirements:** Required single formatted paragraph supporting links, bold, italic, inline code, and colours; reject unsupported formatting and invalid destinations.

**Implementation:** Sanitize/escape output, keep inline code distinct, and retain authored semantics for accessibility and AI indexing.

**Sources:** [Rich text](design/functional/block-library.md#rich-text)

### BLK-006 — Implement Heading

**Labels:** `block`, `text`, `accessibility`

**Requirements:** Required text, optional level 1–6 and colour variant. Level 1 is allowed exactly once and only as the Hero title.

**Implementation:** Render semantic heading elements; generated AI headings are limited to levels 2–6.

**Sources:** [Heading](design/functional/block-library.md#heading)

### BLK-007 — Implement Quote

**Labels:** `block`, `text`

**Requirements:** Required quote text and optional author; author becomes required when the quote is not by the portfolio owner.

**Implementation:** Use semantic quotation markup and present attribution below the quote.

**Sources:** [Quote](design/functional/block-library.md#quote)

### BLK-008 — Implement List

**Labels:** `block`, `text`

**Requirements:** Required non-empty ordered items, optional ordered/unordered type, optional enumeration marks; empty marks render no marker.

**Implementation:** Composed static block using semantic list markup and preserving item order.

**Sources:** [List](design/functional/block-library.md#list)

### BLK-009 — Implement Label

**Labels:** `block`, `text`

**Requirements:** Required text presented distinctly from headings and quotes.

**Implementation:** Authored atomic block; do not imply a heading level unless its usage requires a programmatic label relationship.

**Sources:** [Label](design/functional/block-library.md#label)

### BLK-010 — Implement Image

**Labels:** `block`, `media`, `accessibility`

**Requirements:** Required Media source and alternative text; show alt text when media cannot load.

**Implementation:** Resolve R2 `/images/` URL server-side, respect focal point/resizing data, and require an `alt` attribute while editors own its meaning. AI output may reference only server-resolved published images.

**Sources:** [Image](design/functional/block-library.md#image)

### BLK-011 — Implement Embedded video

**Labels:** `block`, `media`, `security`

**Requirements:** Required external video URL and optional cover image.

**Implementation:** Support only YouTube and YouTube No-Cookie iframe origins; CSP `frame-src` permits those origins while `frame-ancestors 'none'` remains in force.

**Sources:** [Embedded video](design/functional/block-library.md#embedded-video), [Embedding policy](design/technical/website-delivery.md#cross-origin-and-embedding-policy)

### BLK-012 — Implement File download

**Labels:** `block`, `media`

**Requirements:** Required selected file rendered as a download link.

**Implementation:** Resolve the public R2 `/downloads/` URL server-side and preserve a meaningful accessible filename/label.

**Sources:** [File download](design/functional/block-library.md#file-download)

### BLK-013 — Implement Gallery

**Labels:** `block`, `media`, `layout`

**Requirements:** Required layout (`grid`, `carousel`, or `masonry`) and non-empty Image children. Grid is regular; carousel centres the current image while DOM/keyboard order stays authored; masonry respects dimensions.

**Implementation:** Composed static block. The accepted functional design permits Image children; adding embedded videos requires a design change.

**Sources:** [Gallery](design/functional/block-library.md#gallery)

### BLK-014 — Implement Icon

**Labels:** `block`, `media`

**Requirements:** Required icon URL or icon-font library instance representing a brand, technology, or custom icon.

**Implementation:** Resolve referenced icon data server-side and distinguish decorative icons from icons requiring an accessible name.

**Sources:** [Icon](design/functional/block-library.md#icon)

### BLK-015 — Implement Icons

**Labels:** `block`, `media`, `layout`

**Requirements:** Required non-empty Icon children displayed horizontally in authored order.

**Implementation:** Composed static block that wraps responsively without changing semantic order.

**Sources:** [Icons](design/functional/block-library.md#icons)

### BLK-016 — Implement Code

**Labels:** `block`, `technical-content`

**Requirements:** Required language and source; show language and numbered lines, wrap long lines without extra numbers, highlight supported languages, and fall back to plain text. Copy excludes line numbers and temporarily confirms success.

**Implementation:** Escape HTML as source, not markup; copy is keyboard operable.

**Sources:** [Code](design/functional/block-library.md#code)

### BLK-017 — Implement Table

**Labels:** `block`, `technical-content`, `accessibility`

**Requirements:** Required rows of required rich-text cells, optional header and caption. Use only for tabular data.

**Implementation:** Render semantic table structures and retain hierarchy for AI chunking; AI evidence includes headings with matched rows and complete tables only within context budget.

**Sources:** [Table](design/functional/block-library.md#table)

### BLK-018 — Implement Metric

**Labels:** `block`, `technical-content`

**Requirements:** Required numeric value and optional unit displayed on the same line.

**Implementation:** Preserve machine-readable numeric value separately from presentation where practical.

**Sources:** [Metric](design/functional/block-library.md#metric)

### BLK-019 — Implement Hero

**Labels:** `block`, `section`, `seo`

**Requirements:** Required title Heading and introduction text, optional Button action, media visual, and extra children. It is the required first block of every Page, Project, and Article and owns the only `h1`.

**Implementation:** Composed static block; derive plain-text summary/default SEO description from its non-empty introduction. The Page assigned to `/search` is the documented exception to the Hero requirement.

**Sources:** [Hero](design/functional/block-library.md#hero), [Shared public behaviour](design/functional/public-website.md#global-behaviour)

### BLK-020 — Implement Text section

**Labels:** `block`, `section`

**Requirements:** Required non-empty children rendered without additional presentation and excluded from Table-of-contents indexing.

**Implementation:** Composed static block retaining child boundaries for AI ingestion.

**Sources:** [Text section](design/functional/block-library.md#text-section)

### BLK-021 — Implement Text with media

**Labels:** `block`, `section`, `media`

**Requirements:** Required Media block and required non-empty remaining children; do not add opinionated content presentation and exclude from Table-of-contents indexing.

**Implementation:** Composed static responsive block retaining media/text structural relationship for AI ingestion.

**Sources:** [Text with media](design/functional/block-library.md#text-with-media)

### BLK-022 — Implement Callout

**Labels:** `block`, `section`

**Requirements:** Required urgency (`note`, `warning`, `danger`, `error`) and non-empty children; urgency changes presentation.

**Implementation:** Composed static block with accessible semantics not conveyed by colour alone. AI-generated Callouts allow only Heading, Rich text, List, Image, Code, Table, and Metric children.

**Sources:** [Callout](design/functional/block-library.md#callout), [AI supported blocks](design/technical/decisions/0009-use-turso-backed-rag-for-ai-search.md#supported-generated-block-types)

### BLK-023 — Implement Chapter

**Labels:** `block`, `section`, `navigation`

**Requirements:** Required navigational title and non-empty content; multiple Chapters are allowed and titles appear in Table of contents.

**Implementation:** Composed static block with stable request-time anchors derived consistently enough for TOC links; arbitrary editor-authored fragment links remain unsupported. Preserve hierarchy in AI chunks.

**Sources:** [Chapter](design/functional/block-library.md#chapter)

### BLK-024 — Implement Selected articles

**Labels:** `block`, `navigation`, `articles`

**Requirements:** Required Topic filters, grid/list layout, per-page count, maximum count, and Article presentation template. Render current title, Hero visual, summary, Topics, link/action, query Topics, and nested template content; paginate when needed and omit when empty.

**Implementation:** Resolve statically on the server using published Articles, AND Topic filtering before pagination, and current source data. Add this block explicitly to the allowed direct-block configuration where homepage featured content uses it.

**Sources:** [Selected articles](design/functional/block-library.md#selected-articles), [Homepage](design/functional/public-website.md#homepage)

### BLK-025 — Implement Selected projects

**Labels:** `block`, `navigation`, `projects`

**Requirements:** Required Topic filters, grid/list layout, per-page count, maximum count, and Project presentation template. Render current title, Hero visual, summary, Topics, link/action, query Topics, and nested content; paginate when needed and omit when empty.

**Implementation:** Resolve published Projects statically on the server with filtering before pagination. Add this block explicitly to the allowed direct-block configuration where homepage featured content uses it.

**Sources:** [Selected projects](design/functional/block-library.md#selected-projects), [Homepage](design/functional/public-website.md#homepage)

### BLK-026 — Implement Related articles

**Labels:** `block`, `navigation`, `articles`

**Requirements:** Same configurable presentation/pagination contract as Selected articles. On Article detail, match at least one current Topic, exclude the current Article, and omit the block when no matches.

**Implementation:** Resolve current published summaries server-side to relationship depth two. Article changes invalidate every Article detail, Article overview variant, and homepage.

**Sources:** [Related articles](design/functional/block-library.md#related-articles), [Article detail](design/functional/public-website.md#article-detail)

### BLK-027 — Implement Related projects

**Labels:** `block`, `navigation`, `projects`

**Requirements:** Same configurable presentation/pagination contract as Selected projects. On Project detail, match at least one current technology Topic, exclude the current Project, and omit when empty while leaving overview action.

**Implementation:** Resolve current published summaries server-side to relationship depth two. Project changes invalidate every Project detail, Project overview variant, and homepage.

**Sources:** [Related projects](design/functional/block-library.md#related-projects), [Project detail](design/functional/public-website.md#project-detail)

### BLK-028 — Implement Article reference

**Labels:** `block`, `navigation`, `articles`

**Requirements:** Required Article and presentation template using current title, derived summary, link, and action. Deleted or unpublished references disappear.

**Implementation:** Resolve published source data server-side on every uncached mapping; return hero summary and URL only and do not recurse.

**Sources:** [Article reference](design/functional/block-library.md#article-reference)

### BLK-029 — Implement Table of contents

**Labels:** `block`, `navigation`

**Requirements:** Required subchapter depth; produce links from current content's Chapter hierarchy. At most one may exist after templates and authored content are composed.

**Implementation:** Resolve statically during mapping and use Chapter anchors; Text section and Text with media are not indexed.

**Sources:** [Table of contents](design/functional/block-library.md#table-of-contents)

### BLK-030 — Implement Series table of contents

**Labels:** `block`, `navigation`, `articles`

**Requirements:** Required presentation template showing Series title, all published member Articles in order, the current item, and links to others. At most one may exist in the composed page.

**Implementation:** Resolve live public Series membership server-side; unpublished Articles are omitted while order is retained.

**Sources:** [Series table of contents](design/functional/block-library.md#series-table-of-contents)

### BLK-031 — Implement Series pagination

**Labels:** `block`, `navigation`, `articles`

**Requirements:** Required previous/next type and template using adjacent published Article title and URL; omit an unavailable side.

**Implementation:** Resolve against ordered public Series membership server-side.

**Sources:** [Series pagination](design/functional/block-library.md#series-pagination)

### BLK-032 — Implement Menu block

**Labels:** `block`, `navigation`

**Requirements:** Required Menu reference rendered as a simple single-level menu; omit the whole block when the Menu is unavailable or empty.

**Implementation:** Resolve public-eligible items server-side and provide keyboard navigation, visible focus, current-page state, and external-link behaviour. Menu blocks are forbidden in Page, Project, and Article authored content.

**Sources:** [Menu block](design/functional/block-library.md#menu)

### BLK-033 — Implement Site title block

**Labels:** `block`, `navigation`, `global`

**Requirements:** Display and expose the Site settings title to composed blocks.

**Implementation:** Resolve server-side from Site settings, primarily for global templates.

**Sources:** [Site title](design/functional/block-library.md#site-title)

### BLK-034 — Implement Button

**Labels:** `block`, `call-to-action`

**Requirements:** Required label, valid destination, link/button presentation, and colour variant; render as an anchor using selected presentation.

**Implementation:** Preserve link semantics, keyboard/focus behaviour, and internal/external navigation rules.

**Sources:** [Button](design/functional/block-library.md#button)

### BLK-035 — Implement Button group

**Labels:** `block`, `call-to-action`

**Requirements:** Required non-empty Button children and optional shared colour variant; shared variant overrides child variants.

**Implementation:** Composed static block with logical keyboard and reading order.

**Sources:** [Button group](design/functional/block-library.md#button-group)

### BLK-036 — Implement Call to action

**Labels:** `block`, `call-to-action`

**Requirements:** Required title, introduction, and Button or Button group. Pages and content journeys use calls to action to continue exploration or contact.

**Implementation:** Authored static section block; internal destinations respect public eligibility.

**Sources:** [Call to action](design/functional/block-library.md#call-to-action)

### BLK-037 — Implement Contact block

**Labels:** `block`, `call-to-action`

**Requirements:** Required title and introduction; behave as a Call to action whose destination is always the Contact page.

**Implementation:** Resolve the contact route centrally; do not duplicate a configurable destination. Ensure Site settings support email differs from any address exposed here.

**Sources:** [Contact](design/functional/block-library.md#contact)

### BLK-038 — Implement Form block

**Labels:** `block`, `forms`, `interactive`

**Requirements:** Required Form reference; render all configured fields and submit action. Omit the entire block when the Form is unavailable.

**Implementation:** Static form definition plus client interaction; submit to `POST /forms/:id`, preserve entered data and page content on validation failure, and integrate CAP-007.

**Sources:** [Form block](design/functional/block-library.md#form)

### BLK-039 — Specify and implement Template block

**Labels:** `block`, `templates`, `needs-design-detail`

**Requirements:** Resolve a named reusable Template during server mapping; template name is required and cannot be `header` or `footer`.

**Implementation:** The technical design identifies this block but the functional Block library does not define its author-facing fields, allowed placement, or nesting. Resolve those details before implementation without changing the accepted server-side static-resolution boundary.

**Sources:** [Block validation](design/technical/content-and-publishing.md#block-data-validation)

## Epic D — CMS and publishing capabilities

### CAP-001 — Implement CMS administrator authentication and access control

**Labels:** `cms`, `authentication`, `security`

**Requirements:** Only authenticated users access CMS functions; one `administrator` role exists. Sign-out, failed sign-in, and expired sessions return to login. Public read access is limited to the content needed by the protected delivery procedures.

**Accepted decisions:** Visitor accounts do not exist. Sensitive data and submissions remain behind CMS authentication.

**Acceptance:** Admin routes and operations enforce the role, sessions expire safely, and protected records cannot be read anonymously through the CMS UI/API.

**Sources:** [Content management authentication](design/functional/content-management.md#authentication)

### CAP-002 — Implement the CMS content-editing experience

**Labels:** `cms`, `editorial`

**Requirements:** Left navigation distinguishes collections and singular content; collection overviews are searchable. Editors can add, edit, reorder, and delete blocks and select relationships. Warn on unsaved changes and show validation errors together unless fields depend on each other.

**Accepted decisions:** Payload Admin is the editing surface; exact admin-component configuration is an implementation detail.

**Acceptance:** Every implemented model is manageable with the prescribed editor workflow and keyboard shortcuts.

**Sources:** [Creating and editing](design/functional/content-management.md#creating-and-editing-content)

### CAP-003 — Implement drafts, publication, schedules, and revisions

**Labels:** `cms`, `publishing`

**Requirements:** `Cmd/Ctrl+S` creates/saves a draft; actions include save draft, publish changes, schedule/reschedule/cancel, and unpublish. Every save creates a numbered timestamped revision; compare at most two and restoration creates a new revision.

**Accepted decisions:** Draft-save and publication completeness validation are identical. Published edits remain unpublished until explicitly/scheduled published. Homepage cannot be unpublished.

**Acceptance:** State transitions, schedule execution, revision compare/restore, validation, public eligibility, cache invalidation, and AI indexing hooks behave consistently.

**Sources:** [Publication workflow](design/functional/content-management.md#publication-workflow)

### CAP-004 — Implement deletion and reference cleanup

**Labels:** `cms`, `content-lifecycle`, `blocked`

**Requirements:** All collection items except homepage can be deleted; references disappear from public output and referenced deletion requires confirmation. Functional design asks for recoverability for 30 days.

**Accepted decisions:** Published content need not be unpublished first; AI index deletion is attempted synchronously but Payload deletion succeeds if Turso is unavailable.

**Blocked by:** DEF-002 leaves recoverable deletion, restoration, slug reuse, and deleted/restored taxonomy behaviour unresolved. Implement irreversible/basic deletion only after explicitly scoping around or resolving that deferral.

**Sources:** [Deletion](design/functional/content-management.md#deletion), [DEF-002](design/technical/risks-and-deferrals.md#deferral-log)

### CAP-005 — Implement single-use shared previews

**Labels:** `cms`, `website`, `preview`, `security`

**Requirements:** Payload Admin generates a direct preview URL for the latest saved revision. It includes unpublished referenced content and can be viewed once; invalid/expired/used links expose only public content.

**Accepted decisions:** One-hour custom token bound to one item, immutable revision, and hash of normalized full website preview URL. Website forwards it; CMS `previews` validates and atomically consumes it during successful retrieval. Preview also requires downstream JWT, is uncached, and does not use iframe Live Preview.

**Acceptance:** Concurrent requests cannot both succeed, later edits do not alter a link, URL/environment mismatch fails safely, and rendering failure after retrieval does not restore the token.

**Sources:** [ADR 0010](design/technical/decisions/0010-use-single-use-tokens-for-shared-previews.md)

### CAP-006 — Implement SEO editing validation and metadata generation

**Labels:** `cms`, `seo`, `website`

**Requirements:** Every public item has unique title, canonical URL, indexable robots metadata, social metadata, sitemap entry, and description derived from Hero introduction unless overridden. Articles require structured data.

**Accepted decisions:** CMS checks required-value existence and shows errors/warnings; rendered Articles are checked for markup presence, not semantic correctness. Recognized Search/Agent bots are allowed while Training/unwanted crawlers are blocked or limited through Cloudflare.

**Acceptance:** Metadata renders for all public routes, sitemap contains only eligible canonical URLs, and editor validation identifies missing required data.

**Sources:** [SEO and structured data](design/technical/quality-and-safety.md#seo-and-structured-data)

## Epic E — Public website capabilities

### WEB-001 — Implement route precedence and public content resolution

**Labels:** `website`, `routing`

**Requirements:** Support `/`, `/articles`, `/projects`, `/search`, `/forms/:id`, `/api/ai`, `/preview/articles`, `/preview/projects`, `/preview/*`, and `/*`; exact/special routes beat the content splat and redirects run first.

**Accepted decisions:** `/*` contains full page hierarchy or `articles/:slug`/`projects/:slug` context. CMS resolves collection and eligibility. Missing/ineligible/malformed paths return 404.

**Acceptance:** Route collisions are impossible and each endpoint uses the method, procedure, authentication, and cache policy in Website delivery.

**Sources:** [Public entry points](design/technical/website-delivery.md#public-entry-points)

### WEB-002 — Implement homepage delivery and composition

**Labels:** `website`, `page`, `homepage`

**Requirements:** Render Hero with illustration, technology Icons, name/title/introduction and Contact action; selected Projects; selected Articles; work experience; and Contact. Omit a selected block when its filter is empty.

**Accepted decisions:** Retrieve through `content` with shared templates and cache final HTML in Cloudflare. Homepage is the immutable `/` public item.

**Acceptance:** Content follows all three principal visitor journeys and cache/invalidation responds to dependent Article, Project, template, menu, and homepage changes.

**Sources:** [Homepage definition](content-strategy/page-definitions.md#homepage), [Homepage behaviour](design/functional/public-website.md#homepage)

### WEB-003 — Implement hierarchical standard pages and breadcrumbs

**Labels:** `website`, `page`, `navigation`

**Requirements:** Render the Page Hero and authored blocks with homepage-to-parent-to-current breadcrumbs; every crumb except current is linked. Standard pages have no shared post-content.

**Accepted decisions:** Hierarchical route is recursively derived; parent moves redirect descendants. Final public HTML is cached.

**Acceptance:** Arbitrary supported page depths resolve, breadcrumbs and canonical URL match, and draft/missing ancestors cannot leak unpublished content.

**Sources:** [Standard page](design/functional/public-website.md#standard-page)

### WEB-004 — Implement Projects overview

**Labels:** `website`, `projects`, `overview`

**Requirements:** `/projects` lists published Projects by publication date, 15 per page, with Hero image, title, summary, and technologies; support technology filtering and a useful empty state.

**Accepted decisions:** Repeated `topics` IDs use AND matching before pagination. `page` is one-based/default 1 and omitted for page 1; invalid negative/out-of-range values normalize to 0. Response includes total items/pages/current page, and query parameters are part of cache identity.

**Acceptance:** Filtering, pagination, canonical URLs, empty states, cache variants, and responsive cards work.

**Sources:** [Projects overview](design/functional/public-website.md#projects-overview), [ADR 0007 pagination](design/technical/decisions/0007-use-trpc-for-website-to-cms-data-access.md#pagination-transport)

### WEB-005 — Implement Project detail

**Labels:** `website`, `projects`, `detail`

**Requirements:** Render Hero including technologies, authored engineering case study, and project shared post-content. Client information is authored, not injected. Related Projects share at least one technology and exclude current.

**Accepted decisions:** Resolve at `/projects/:slug` via content splat; cache final HTML. Mapping includes static relationship data and shared templates.

**Acceptance:** Detail pages support the intended case-study narrative, related navigation, overview action, and Contact journey.

**Sources:** [Project page](content-strategy/page-definitions.md#project-page), [Project detail](design/functional/public-website.md#project-detail)

### WEB-006 — Implement Articles overview

**Labels:** `website`, `articles`, `overview`

**Requirements:** `/articles` lists published Articles by publication date, 15 per page, with Hero image, title, summary, and Topics; support Topic filtering and empty state.

**Accepted decisions:** Use the same repeated Topic, pagination, URL-cleaning, cache identity, and procedure semantics as Projects.

**Acceptance:** Filtering, pagination, totals, canonical URLs, empty states, cache variants, and responsive presentation work.

**Sources:** [Articles overview](design/functional/public-website.md#articles-overview)

### WEB-007 — Implement Article detail

**Labels:** `website`, `articles`, `detail`

**Requirements:** Render Hero with Topics, before-content, authored technical article, and after-content. Support Chapter TOC, optional Series TOC, related Articles, overview action, Contact, previous/next Series navigation, and Article structured data.

**Accepted decisions:** Resolve at `/articles/:slug`, cache final HTML, omit unpublished Series members/relationships, and use static relationship mapping.

**Acceptance:** Technical content and all contextual navigation render in documented order and preserve the intended reading/contact journey.

**Sources:** [Article page](content-strategy/page-definitions.md#article-page), [Article detail](design/functional/public-website.md#article-detail)

### WEB-008 — Implement Contact page

**Labels:** `website`, `contact`, `forms`

**Requirements:** `/contact` renders collaboration Hero, Contact Form, and contact information such as email/telephone. Field errors are adjacent; form-wide errors appear above the form.

**Accepted decisions:** Page HTML is cached as normal public content; form submission is a separate uncached POST. The path is release-blocking and must verify form rendering.

**Acceptance:** The contact journey works across supported viewports and the form integrates with CAP-007.

**Sources:** [Contact page](content-strategy/page-definitions.md#contact-page)

### WEB-009 — Implement global navigation

**Labels:** `website`, `navigation`, `accessibility`

**Requirements:** Header primary menu links Home, Projects, Articles, Contact; footer links privacy/copyright. Indicate current page, support keyboard/focus, open external links in new tab, hide empty menus, and allow vertical responsive layout without a separate mobile-menu pattern.

**Accepted decisions:** Menus are CMS-managed single-level content resolved server-side.

**Acceptance:** Both menus satisfy keyboard, focus, touch, and responsive requirements on every page.

**Sources:** [Information architecture](content-strategy/information-architecture.md#navigation), [Global navigation](design/functional/navigation.md#global-navigation)

### WEB-010 — Implement Cloudflare HTML caching and targeted invalidation

**Labels:** `website`, `cache`, `cloudflare`

**Requirements:** Cache final `/`, overview, and published-content HTML by URL; include overview query strings. Exclude `/search`, preview, forms, AI, maintenance, and errors from public caching.

**Accepted decisions:** Page changes purge their URL; Article/Project changes purge all same-type details, all overview variants, and homepage; slug/unpublish purges old URL; shared templates/header/footer/menu purge all website HTML; Form changes purge using pages. Purge failure does not block save and is recovered manually.

**Acceptance:** Hooks compose all applicable targets, purges remain scoped, failures are logged, and release checks prove cached/uncached route classes.

**Sources:** [ADR 0008](design/technical/decisions/0008-use-cloudflare-cdn-caching-with-targeted-publication-invalidation.md)

### WEB-011 — Implement visitor-facing failure and degraded behaviour

**Labels:** `website`, `errors`, `resilience`

**Requirements:** 404 uses Not found; CMS/auth/timeouts use uncached 503 Error page; configuration failure uses 500; form state uses 404/409/400; other failures use 500. Missing media shows alt, missing menu/form block is omitted, and missing Header fails delivery.

**Accepted decisions:** No general automatic retries. Error boundary renders Error page or independent fallback. Every exception and Error-page occurrence is logged in trace context; every 503 alerts.

**Acceptance:** Automated integration tests cover every documented error, fallback, maintenance, and recovery-facing path.

**Sources:** [Failure behaviour](design/technical/website-delivery.md#failure-and-degraded-behaviour)

## Epic F — Forms and AI functionality

### CAP-007 — Implement contact-form submission processing

**Labels:** `forms`, `website`, `cms`, `blocked`

**Requirements:** Fields are Name (required text), Inquiry type (required select), Email (required email), Explanation (optional textarea), plus consent. Validate on blur and submit; disable editing/resubmission while pending; success replaces form; validation failure retains values and page. Notify author and visitor, with submitted data in visitor notification; retain submissions 30 days; prevent spam.

**Accepted decisions:** Website posts to `/forms/:id`, CMS `form-submission` handles it. Missing form is 404, non-submittable state 409, validation 400. Inputs are sanitized and personal data is excluded/redacted from logs.

**Blocked by:** DEF-001 leaves processing order, retention enforcement, spam mechanism, retries/duplicates, notifications, access, and deletion monitoring to a separate design.

**Sources:** [Forms](design/functional/forms.md), [DEF-001](design/technical/risks-and-deferrals.md#deferral-log)

### AI-001 — Provision the Turso search stores

**Labels:** `ai-search`, `database`, `infrastructure`

**Requirements:** Store derived chunks, hierarchy, metadata, FTS data, embeddings, generations, and deletion/freshness state separately from authoritative D1 content.

**Accepted decisions:** Separate Turso Cloud databases for staging/production; local embedded libSQL for development; do not use the newer Turso Database/Limbo engine. Configuration is server-only.

**Acceptance:** Schema supports lexical/vector retrieval, parent lookup, stable source/generation identity, and environment isolation.

**Sources:** [ADR 0009 storage](design/technical/decisions/0009-use-turso-backed-rag-for-ai-search.md#vector-lexical-and-relational-storage)

### AI-002 — Implement AI-search ingestion and reconciliation

**Labels:** `ai-search`, `ingestion`, `background-jobs`

**Requirements:** Index published Projects, Articles, and Contact page only. Normalize full source, perform layout-aware hierarchical chunking, enrich content type/Topics/technologies, and use 10–15% overlap only between adjacent splits of one textual block.

**Accepted decisions:** Publish/update schedules background ingestion; unpublish/delete attempts synchronous removal but succeeds if Turso fails. Jobs validate current source generation, replace all old chunks, try at most four times, log terminal failure, reconcile by last-edited timestamp each run, and alert after one hour without successful processing.

**Acceptance:** Stale jobs cannot resurrect old/deleted content, reconciliation repairs missed/partial work, and ineligible models never enter the index.

**Sources:** [ADR 0009 ingestion](design/technical/decisions/0009-use-turso-backed-rag-for-ai-search.md#ingestion-timing-and-freshness)

### AI-003 — Implement hybrid retrieval and context selection

**Labels:** `ai-search`, `retrieval`, `rag`

**Requirements:** Apply eligibility/current-generation filters and explicit/high-confidence metadata filters; retrieve 20 lexical and 20 vector children; equally weighted RRF; retain about 8–10 children; aggregate/substitute/deduplicate parents; select 4–6 evidence units and 3,000–5,000 tokens.

**Accepted decisions:** Rank children before parent substitution, use best-child base plus capped diminishing support, stable parent identity, at most one useful adjacent sibling per side, and per-parent limits. Corpus growth does not automatically increase context.

**Acceptance:** Retrieval preserves provenance, respects minimum-evidence rules, and evaluation can tune constants without changing the architecture.

**Sources:** [ADR 0009 retrieval](design/technical/decisions/0009-use-turso-backed-rag-for-ai-search.md#search-and-context-retrieval)

### AI-004 — Implement grounded generation and citation validation

**Labels:** `ai-search`, `generation`, `safety`

**Requirements:** Use deterministic retrieval followed by one structured generation phase. Portfolio claims require eligible evidence; insufficient evidence yields structured insufficiency/related results/clarification rather than invention.

**Accepted decisions:** The model has no tools or direct database/network/credential access. User input and retrieved content cannot override application policy. Evidence gets opaque citation IDs; server resolves valid IDs to canonical sources and rejects unknown citations.

**Acceptance:** Unsupported/general-purpose requests remain scope-limited and prompt-injection tests cannot bypass retrieval, schema, reference, or citation controls.

**Sources:** [ADR 0009 safety](design/technical/decisions/0009-use-turso-backed-rag-for-ai-search.md#safety-and-content-trust)

### AI-005 — Implement the streamed AI event protocol

**Labels:** `ai-search`, `streaming`, `schema`

**Requirements:** Support versioned JSON `start-block`, `start-child-blocks`, `end-child-blocks`, `aggregate-text`, `aggregate-props`, `end-block`, and `end` events. Server parses and contextually validates before forwarding; client validates defensively and builds a temporary response model.

**Accepted decisions:** No free-form output. Supported generated blocks are Heading 2–6, Rich text, List, Image, Code, Table, Metric, and Callout. The route-specific result overview is not a block. Server resolves referenced fields/URLs. Only a fully validated response ending in `end` enters history; partial output is provisional.

**Acceptance:** Invalid events cancel the stream, discard provisional output, and show retry state; generated content uses the shared block renderer, while conventional result data is consumed by the route-specific AI interface.

**Sources:** [ADR 0009 event protocol](design/technical/decisions/0009-use-turso-backed-rag-for-ai-search.md#event-protocol)

### AI-006 — Implement anonymous sessions and rate limiting

**Labels:** `ai-search`, `rate-limit`, `privacy`

**Requirements:** One session per visitor; maximum five accepted requests/minute and thirty/day. Store prompt history in atomic page-lifetime state and request timestamps by identity; refresh clears history but not rate state.

**Accepted decisions:** Identity is a cryptographic hash of request IP. Exceeded limits fail before retrieval/generation, return wait duration, show an error, and lock input. Visitor retries remain limited and count when accepted.

**Acceptance:** Concurrent streaming does not corrupt history, limits use rolling stored timestamps, raw IP is not persisted/logged, and shared-IP collision is treated as accepted risk.

**Sources:** [ADR 0009 sessions](design/technical/decisions/0009-use-turso-backed-rag-for-ai-search.md#sessions-and-usage-limits)

### AI-007 — Implement AI degraded states and telemetry

**Labels:** `ai-search`, `errors`, `observability`

**Requirements:** Turso/model unavailability blocks requests and shows temporary unavailable. Embedding/generation/timeout failures show retry; streaming failure replaces partial output; invalid output cancels stream and shows retry.

**Accepted decisions:** Prompts, passages, and answers are never logged. Record complexity, token counts, timings, failure class, trace, and LLM usage count. Alert after one hour without successful ingestion.

**Acceptance:** Every state is distinguishable operationally without leaking interaction content, and all retry actions obey normal limits.

**Sources:** [ADR 0009 failures](design/technical/decisions/0009-use-turso-backed-rag-for-ai-search.md#failure-and-degraded-behaviour)

### AI-008 — Implement the route-specific AI interface

**Labels:** `ai-search`, `website`, `interactive`

**Requirements:** Implement one `/search` route component that composes the CMS-managed Page introduction with prompt input, suggested questions for a fresh chat, provisional streamed answers, validated conversation history, conventional result overview, errors/retry, rate-limit lockout, and temporary-unavailable state. Input remains editable during generation but submission is disabled.

**Accepted decisions:** The AI interface is not a CMS content block and is not registered with the shared block renderer. It calls uncached `POST /api/ai`; refresh clears conversation history but not identity-based rate limits. Generated explanatory content may use supported shared blocks. Conventional search results use an interface-owned overview component populated from server-validated published references and resolved titles, summaries, canonical URLs, and assets.

**Acceptance:** `/search` renders the Page content and interface exactly once; both conversational and conventional queries use the same interface; ordinary content-block authoring never exposes either the interface or result overview as selectable blocks; and all streaming, failure, retry, accessibility, and responsive states are covered.

**Sources:** [Agentic navigation](design/functional/navigation.md#agentic-navigation), [ADR 0009](design/technical/decisions/0009-use-turso-backed-rag-for-ai-search.md#structured-ai-interface-responses)

## Epic G — Quality, security, operations, and release engineering

### OPS-001 — Implement runtime configuration validation

**Labels:** `operations`, `configuration`

**Requirements:** Validate required CMS and website configuration at runtime. Invalid local configuration produces 500 Error page; invalid CMS configuration observed by website produces 503.

**Accepted decisions:** Development, staging, and production have separate D1, R2, caches, domains, OAuth credentials, signing keys, and Turso stores; no preview deployments.

**Acceptance:** Missing/malformed configuration fails safely before dependent work and never prints secrets.

**Sources:** [Environments](design/technical/development-and-operations.md#environments)

### OPS-002 — Configure Cloudflare security policies

**Labels:** `security`, `cloudflare`

**Requirements:** No application CORS dependency; apply `frame-ancestors 'none'`; permit iframe sources only YouTube/YouTube No-Cookie; sanitize inputs; protect against abusive traffic; restrict crawler classes as designed.

**Accepted decisions:** Sensitive data is CMS-only and excluded/redacted from logs. Cloudflare permits recognized Search/Agent automation and blocks Training/unwanted crawlers when detected.

**Acceptance:** Response headers and Cloudflare rules are verified in staging without breaking required media, video, website, CMS, preview, or AI flows.

**Sources:** [Security](design/technical/quality-and-safety.md#security-privacy-and-abuse-prevention)

### OPS-003 — Implement structured logging, tracing, metrics, and alerts

**Labels:** `observability`, `operations`

**Requirements:** Log every exception, Error-page render, LLM usage count, and unscheduled downtime; correlate all pipeline logs with one trace. Alert every 503, every unscheduled downtime period, and one-hour AI-ingestion outage.

**Accepted decisions:** Error-page display alone does not alert. Scheduled maintenance is distinguished from downtime. Personal/sensitive data and AI interaction content are excluded/redacted.

**Acceptance:** Website, OAuth endpoint, CMS procedure, background jobs, and deployment/recovery telemetry can be correlated without sensitive payloads.

**Sources:** [Observability](design/technical/quality-and-safety.md#observability-and-failure-verification)

### OPS-004 — Implement dependency and supply-chain verification

**Labels:** `security`, `dependencies`, `ci`

**Requirements:** Scan dependencies automatically, review runtime dependencies before addition, and install from committed lockfile.

**Accepted decisions:** Affecting critical/high vulnerabilities block release unless proven non-applicable; lower severity follows maintenance. SBOM, package signing, and extensive licence governance are not required.

**Acceptance:** CI reports findings and enforces the release rule with a documented exception record.

**Sources:** [Security](design/technical/quality-and-safety.md#security-privacy-and-abuse-prevention)

### OPS-005 — Implement coordinated Cloudflare deployment

**Labels:** `deployment`, `github-actions`, `cloudflare`

**Requirements:** Activate maintenance; inspect migrations; store D1 bookmark and migrate if needed; deploy CMS/website concurrently from one revision; clear cache; verify migration/routes/cache; disable maintenance only on success. Complete deploy or rollback within one hour.

**Accepted decisions:** Failure rolls back both Workers and restores D1 bookmark if migration processing began; maintenance stays active after failure/recovery. Developer triggering deploy monitors and handles recovery failure.

**Acceptance:** Staging proves successful and failed paths, and a release cannot be marked successful until every gate passes.

**Sources:** [Coordinated releases](design/technical/development-and-operations.md#coordinated-releases)

### OPS-006 — Implement D1 migration and Time Travel recovery workflows

**Labels:** `database`, `migration`, `recovery`

**Requirements:** Generate/review committed migrations with `payload migrate:create`; apply with `payload migrate`; verify status, connection, representative blocks, and exit code. Store a current non-empty Time Travel bookmark before migration and retain native history for 30 days.

**Accepted decisions:** Workers never migrate at startup. Content/revision/block transforms belong in migration `up`/`down`; irreversible work documents recovery dependency. Long migration fails normal release, rolls back, then runs manually in dedicated workflow under maintenance with its own bookmark.

**Acceptance:** Automated recovery restores the stored bookmark and both Workers, and workflow changes are failure-tested in staging.

**Sources:** [Database migrations](design/technical/development-and-operations.md#database-migrations)

### OPS-007 — Implement release-blocking smoke and cache checks

**Labels:** `testing`, `release`, `ci`

**Requirements:** Verify `/`, `/contact` with Form rendering, one Article, one Project, `/search`, and CMS `/admin`. Warm and prove cache hits for `/`, representative Article/Project; prove `/search`, previews, forms, AI, and maintenance are not cache hits.

**Accepted decisions:** Every check blocks release. Representative paths vary by environment and checks avoid real form/AI side effects.

**Acceptance:** Deployment workflow records each result and enters automated recovery on any failure.

**Sources:** [Verification gates](design/technical/quality-and-safety.md#verification-gates)

### OPS-008 — Implement responsive and browser verification

**Labels:** `testing`, `responsive`, `browser`

**Requirements:** Support Baseline Widely Available browsers, touch and pointer input, and mobile/tablet/desktop/wide-desktop classes. Automatically detect unintended overflow; editors/developers verify readability and aesthetics.

**Accepted decisions:** Exact breakpoints and viewport fixtures are implementation details. No interaction may require hover or precise pointer input.

**Acceptance:** Automated coverage exercises representative routes/blocks at all classes and manual checklist covers interaction and presentation.

**Sources:** [Browser compatibility](design/technical/quality-and-safety.md#browser-compatibility-and-responsive-behaviour)

### OPS-009 — Implement accessibility verification

**Labels:** `accessibility`, `testing`

**Requirements:** Meet WCAG 2.2 AA, keyboard operability, screen-reader compatibility, contrast, meaningful structure, and required image alt attributes. Renderer owns enforceable output; editors own semantic content quality.

**Accepted decisions:** Verification is primarily manual with DevTools/Lighthouse assistance. Automated accessibility findings are not currently mandatory release blockers.

**Acceptance:** Shared renderer has automated semantic checks where reliable and an editor/developer manual checklist covers the remainder.

**Sources:** [Accessibility](design/technical/quality-and-safety.md#accessibility)

### OPS-010 — Implement performance measurement

**Labels:** `performance`, `monitoring`

**Requirements:** Target cached TTFB ≤800 ms p75; LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1 p75 separately for mobile/desktop. Monitor cache-hit ratio diagnostically without a minimum.

**Accepted decisions:** Use field data when representative and repeatable synthetic measurements otherwise; a single deployment request does not block release.

**Acceptance:** Measurements and dashboards distinguish mobile/desktop and cached/uncached behaviour and retain enough history for p75 evaluation.

**Sources:** [Performance](design/technical/quality-and-safety.md#performance-and-availability)

### OPS-011 — Implement the maintenance Worker and traffic switch

**Labels:** `operations`, `maintenance`, `cloudflare`

**Requirements:** Serve a standalone maintenance page for all application traffic while maintenance mode is active. Return uncached HTTP 503 and remain available independently of the CMS and website Workers.

**Accepted decisions:** Cloudflare activates maintenance before every release and disables it only after complete success. Failed deploys, rollback, recovery, and separately run long migrations leave it active. Scheduled maintenance is not reported as unscheduled downtime.

**Acceptance:** Deployment tests prove activation, full traffic interception, `503`/no-cache behaviour, and restoration of normal traffic after success.

**Sources:** [Maintenance mode](design/technical/website-delivery.md#maintenance-mode)

### OPS-012 — Implement the local Cloudflare-compatible development environment

**Labels:** `development`, `cloudflare`, `tooling`

**Requirements:** Provide a development command that emulates the Cloudflare Worker runtime for CMS and website work and uses development-only D1, R2, cache, domain, credentials, signing key, and local embedded libSQL resources.

**Accepted decisions:** Development is isolated from staging/production, has no preview deployments, and may access permitted production content but never production form submissions. Migration/deployment workflows run only for staging and production.

**Acceptance:** A developer can run both application boundaries and their local dependencies without production credentials, and Worker-runtime compatibility is exercised before staging.

**Sources:** [Development runtime compatibility](design/technical/development-and-operations.md#development-runtime-compatibility)

## Epic H — Initial content and editorial production

### CNT-001 — Configure initial global and system content

**Labels:** `content`, `launch`

**Requirements:** Create Site settings, Header, Footer, Not found, Error page, the `/search` Page through the normal Pages collection, primary menu (Home/Projects/Articles/Contact), footer privacy/copyright menu, and required shared Project/Article regions.

**Decisions:** Every journey offers a clear path to Contact; content is professional, technical, concise, evidence-based, and accessible.

**Acceptance:** Required templates pass CMS validation and all launch routes render without placeholder system content.

**Sources:** [Information architecture](content-strategy/information-architecture.md), [Editorial guidelines](content-strategy/editorial-guidelines.md)

### CNT-002 — Author the Homepage

**Labels:** `content`, `launch`, `homepage`

**Requirements:** Add visual/name/job-title/technologies/Contact Hero, selected Projects and Articles with overview actions, work experience, and Contact block.

**Acceptance:** Content supports recruiter, client, and engineer audiences and all homepage journeys in the strategy.

**Sources:** [Homepage](content-strategy/page-definitions.md#homepage)

### CNT-003 — Author the Projects and Articles overview content

**Labels:** `content`, `launch`, `overview`

**Requirements:** Configure overview introductions, filter/empty-state copy, result templates, and Contact actions for `/projects` and `/articles`.

**Acceptance:** Copy explains each content domain and remains useful with no results or no filter matches.

**Sources:** [Page definitions](content-strategy/page-definitions.md)

### CNT-004 — Author the Contact page and Contact form

**Labels:** `content`, `launch`, `contact`

**Requirements:** Create collaboration Hero, contact details, consent copy, Inquiry type options, success/failure messages, and notification copy.

**Acceptance:** Contact content is clear to all target audiences and contains no support-email/notification-recipient conflict.

**Sources:** [Contact page](content-strategy/page-definitions.md#contact-page), [Contact form](design/functional/forms.md#contact-form)

### CNT-005 — Author privacy and copyright content

**Labels:** `content`, `launch`, `legal`

**Requirements:** Create the privacy statement required by personal-data collection and the copyright statement linked from the Footer. Explain contact-form consent, submitted data, purpose, 30-day retention, and appropriate contact route without exposing the technical support address as a general contact address.

**Acceptance:** Footer destinations resolve publicly, the wording matches implemented form handling, and the content is reviewed before production submissions are enabled.

**Sources:** [Global navigation](design/functional/navigation.md#global-navigation), [Forms privacy](design/functional/forms.md#privacy-and-abuse-prevention)

## Known design prerequisites represented in this backlog

- **DEF-001:** Complete form processing and personal-data handling before production submissions are enabled; see CAP-007.
- **DEF-002:** Resolve deletion, restoration, and reference lifecycle edge cases before implementing the complete recoverable-deletion promise; see CAP-004.
- **DEF-003:** Architecture diagrams remain deferred documentation and do not block implementation tasks by themselves.
- **DEF-004:** Automated accessibility checks are optional release gates; manual WCAG 2.2 AA verification remains required.
- **Template block:** BLK-039 needs a functional authoring contract before coding.
- **Selected blocks:** BLK-024 and BLK-025 are required by the homepage and functional Block library but must be added explicitly to the technical allowed-block configuration.
