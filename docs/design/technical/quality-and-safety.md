# Quality and safety

## Document status

- **Maturity:** Accepted
- **Scope:** Verification gates, browser compatibility, responsive behaviour, accessibility, performance, availability, security, privacy, abuse prevention, observability, SEO and structured data, and failure verification.
- **Excludes:** Component architecture, content schemas, deployment procedures, and routine implementation configuration.
- **Prepared ADRs:** [ADR 0007](decisions/0007-use-trpc-for-website-to-cms-data-access.md), [ADR 0009](decisions/0009-use-turso-backed-rag-for-ai-search.md), and [ADR 0010](decisions/0010-use-single-use-tokens-for-shared-previews.md)
- **Related functional design:** [Requirements](../functional/requirements.md), [content management](../functional/content-management.md), and [forms](../functional/forms.md)

## Purpose

This document defines the quality and safety guarantees that affect delivery, security, privacy, discoverability, and operation. It records what must be true and how the result is verified at a design level. Routine tool configuration, individual test cases, and incident-specific procedures are outside its scope.

## Verification gates

Before a release can succeed, it verifies these website paths:

- `/`
- `/contact`, including successful rendering of the form
- One representative article page
- One representative project page
- `/search`

It also verifies the CMS path `/admin`.

Every check is release-blocking: if any path fails verification, the release fails. The concrete article and project paths may differ by environment. How the checks are implemented and how those representative paths are configured are implementation details. The contact check covers form rendering; it does not submit a form.

Cache correctness is also release-blocking. After warming the cache, repeated requests to `/`, one representative article, and one representative project must be served as Cloudflare cache hits. Verification of the uncached route classes must confirm that `/search`, previews, form submissions, and AI requests are not served as cache hits. Exact request construction and the mechanism used to avoid real form-delivery or AI side effects during verification are implementation details.

## Browser compatibility and responsive behaviour

The browser baseline is **Baseline Widely Available**. The website supports touch devices as well as pointer-based devices; interactions must not depend solely on hover or precise pointer input.

The responsive design supports four screen-size classes:

- Mobile
- Tablet
- Desktop
- Wide desktop

Responsive behaviour is automatically checked for unintended content overflow. Readability, content presentation, and general visual quality across the supported screen sizes are primarily verified by editors and developers. Exact breakpoint values, representative test viewport dimensions, and the test implementation are implementation details.

## Accessibility

The website targets WCAG 2.2 conformance at level AA.

The shared renderer is responsible for accessibility requirements that can be guaranteed by the implementation. Editors are responsible only where conformance depends on the meaning or quality of content. For example, the code verifies the presence of an image's `alt` attribute, while the editor is responsible for providing alternative text that meaningfully represents the image.

Accessibility verification is primarily manual. Browser developer tools and Lighthouse may automate the checks they can detect, but they do not replace manual verification. Automated accessibility checks are not a mandatory release-blocking gate; whether they are added to that gate depends on the project time available.

## Performance and availability

Cached public pages target a Time to First Byte of no more than 800 milliseconds at the 75th percentile. Overall page performance targets the Core Web Vitals thresholds for a good experience at the 75th percentile, evaluated separately for mobile and desktop:

- Largest Contentful Paint of no more than 2.5 seconds
- Interaction to Next Paint of no more than 200 milliseconds
- Cumulative Layout Shift of no more than 0.1

These percentile-based targets are monitored over multiple measurements and do not block a release based on a single deployment-time request. When there is insufficient field data, repeatable synthetic measurements are used as an approximation until representative field data is available.

Cloudflare's cache-hit ratio is monitored as diagnostic information without a required minimum and does not block releases. It is interpreted in context because traffic volume, geographic distribution, cache purges, and requested URLs can materially affect it.

No formal uptime or availability objective is defined. Availability follows the guarantees of the selected hosting providers. Failure and degraded behaviour follow [Website delivery](website-delivery.md) and the relevant feature-specific designs.

Cache identity, publication invalidation, and failed-purge recovery are defined in [ADR 0008](decisions/0008-use-cloudflare-cdn-caching-with-targeted-publication-invalidation.md). AI-search latency, availability, and cost controls belong in [ADR 0009](decisions/0009-use-turso-backed-rag-for-ai-search.md). Deployment and recovery timing is defined in [Development and operations](development-and-operations.md).

## Security, privacy, and abuse prevention

The public website has no visitor accounts, and ordinary public content requires no visitor authentication or authorization. User authentication and role-based authorization apply only to the CMS. Shared previews are the exception: their request-specific token is a narrowly scoped capability governed by [ADR 0010](decisions/0010-use-single-use-tokens-for-shared-previews.md). This is separate from the website-to-CMS service authentication defined in [ADR 0007](decisions/0007-use-trpc-for-website-to-cms-data-access.md).

Secrets are available only through their dedicated environment or hosting-provided configuration. They are not stored in source code or exchanged between developers.

Untrusted inputs are sanitized before they are sent downstream and escaped appropriately for their destination context. Sensitive data is never displayed on the public website and, when present, is available only behind the CMS. Sensitive and personal data is excluded from logs or redacted when exclusion is not possible.

Cloudflare provides the cross-cutting protection against abusive requests and automatically limits them. Feature-specific controls remain with their owning design, including the AI-search controls in [ADR 0009](decisions/0009-use-turso-backed-rag-for-ai-search.md) and form-specific controls in the form-delivery design.

Dependencies are automatically scanned for known vulnerabilities. A known critical or high-severity vulnerability that affects deployed code blocks a release unless it is demonstrated not to affect the application. Lower-severity findings are handled through normal maintenance.

New runtime dependencies are reviewed before they are added. Installations must use the committed package-manager lockfile. Exact scanners, commands, update automation, and continuous-integration configuration are implementation details. Formal software bills of materials, package signing, continuous supply-chain monitoring, and extensive licence-governance procedures are not required.

Preview-specific security belongs in [ADR 0010](decisions/0010-use-single-use-tokens-for-shared-previews.md).

## Observability and failure verification

The system records:

- Every exception
- Every occurrence in which an error page is rendered
- Each use of the LLM as a usage count
- Every period of downtime outside scheduled maintenance

AI-search prompts, retrieved passages, and generated answers are never logged. AI-search telemetry contains operational metadata only, including request complexity, token counts, timings, failure category, and usage counts. All telemetry remains subject to the sensitive- and personal-data exclusion and redaction rules defined above. Scheduled maintenance is distinguished from unscheduled downtime and is not recorded as a downtime incident.

Every log entry is recorded within the context of a trace and can be correlated through its trace identifier. Exact tracing and logging providers, span construction, and propagation implementation are implementation details.

Every service-unavailable failure requires an alert. Every period of downtime outside scheduled maintenance also requires an alert. The AI-search ingestion processor produces an alert after one continuous hour without successful processing. An error page being rendered is logged but does not require an alert by itself; it triggers an alert only when its cause is also an alert condition. Scheduled maintenance does not trigger a downtime alert.

Error-page and independent-fallback behaviour are verified through automated integration tests. Maintenance-mode activation, its uncached `503 Service Unavailable` response, and the return to normal traffic are verified as part of the deployment workflow.

The automated recovery workflow is tested in staging whenever that workflow changes materially. Failure scenarios are not deliberately triggered in production. Exact failure-injection and test implementation are implementation details.

Visitor-facing failure behaviour is defined in [Website delivery](website-delivery.md), while deployment and recovery responsibilities are defined in [Development and operations](development-and-operations.md).

## SEO and structured data

Articles require structured data. Other public content renders its primary heading as an `h1` element in the hero. The default description is derived from the introduction in the hero; an explicitly configured SEO description continues to override that default.

All public content has:

- A canonical URL
- Robots metadata that permits indexing
- Social metadata
- An entry in the sitemap

Recognised search-engine traffic, AI agents, fetchers, and web agents are allowed. Cloudflare permits recognised **Search** and **Agent** automation while blocking **Training** crawlers and blocking or limiting other unwanted automated crawling when detected. The site's crawler directives express the same preference; Cloudflare enforcement is used because crawler compliance with those directives is voluntary. Exact bot-control and crawler-directive configuration are implementation details.

During content editing, the CMS automatically checks for the existence of the values required to produce these outputs and displays errors or warnings when they are absent. Rendered article output is automatically checked for the presence of structured markup, but its semantic validity is not automatically assessed. Editors remain responsible for the meaning and quality of metadata. Exact markup construction and validation implementation are implementation details.

[Back to technical design](README.md)
