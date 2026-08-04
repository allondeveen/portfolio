# ADR 0010: Use single-use tokens for shared previews

> **Status: Accepted**
>
> **Decision state:** Accepted. Shared previews use one-hour, single-use tokens bound to the latest saved revision and its website URL. The CMS validates and consumes the token while retrieving the preview.

## Context

Payload provides the draft and revision capabilities needed to save unpublished content, retrieve a selected revision, and generate a Preview URL from its Admin interface. It does not by itself provide the complete single-use-token lifecycle required by this application, so that security boundary must be designed explicitly.

Editors need to preview unpublished content in the same presentation used by the public website and to share a preview with a person who does not have a CMS account. The link must not grant general access to drafts or remain reusable after the intended view. A preview can also depend on referenced unpublished content, so authorization cannot be limited to the primary document while implicitly exposing every other draft.

The browser requests the preview through the public website, while the CMS owns revisions and unpublished-content access. The website-to-CMS call is separately authenticated through the service boundary defined by [ADR 0007](0007-use-trpc-for-website-to-cms-data-access.md). Preview authorization must therefore complement that service authentication without moving ownership of draft authorization into the website.

The website also uses `frame-ancestors 'none'`. Payload's iframe-based Live Preview is consequently incompatible with the accepted embedding policy. The relevant Payload integration is its direct Admin Preview URL, which opens the website preview route outside an iframe.

## Decision

### Preview link and authority

Payload Admin generates a direct website Preview URL containing a custom single-use preview token. The token grants access to exactly one content item and one saved revision.

The bound revision is the latest saved revision at the time the link is issued. Later edits do not change what the link previews; a new revision requires a new preview link. Unsaved editor changes are never included.

The token also authorizes unpublished referenced content reached while resolving that bound revision. It does not authorize unrelated unpublished content, a different revision of the primary item, or references that are not part of that preview's resolved content graph.

### Lifetime, website binding, and single use

The token expires one hour after issuance. It is bound to a hash of the normalized, complete website Preview URL for which it was created. A token issued for one route, domain, or environment cannot authorize a different Preview URL.

The website receives the token with the visitor request and forwards it, the requested preview path, and the URL information required to verify the binding to the CMS `previews` procedure. The website does not make the authoritative preview-authorization decision.

The CMS `previews` procedure validates the token's expiry, unused state, content and revision binding, and website-URL binding. It consumes the token atomically as part of one successful preview retrieval. Concurrent attempts cannot both retrieve the authorized preview.

Successful CMS retrieval spends the token even if the website subsequently fails to render or deliver the response. Consumption is tied to access to the unpublished data, rather than to an outcome the CMS cannot observe reliably.

### Interaction with service authentication

Every call to `previews` also requires the CMS access token defined by ADR 0007. The two controls serve different principals and purposes:

- The Client Credentials access token authorizes the website Worker to call the CMS procedure.
- The single-use preview token authorizes that request to retrieve the bound unpublished revision and its permitted references.

Possession of either token without the other is insufficient to retrieve unpublished content.

### Invalid-preview and caching behaviour

An expired, invalid, already-used, or mismatched preview token does not disclose whether the bound unpublished content exists. The request can resolve only content that is publicly eligible; unpublished content and unpublished references are omitted. Preview responses are never cached and do not set a public `Cache-Control` directive.

### Implementation boundary

The token representation, entropy, hashing algorithm, URL-normalization procedure, persistence model, atomic-consumption mechanism, and exact Payload Admin configuration are implementation details. Their implementations must preserve the lifetime, binding, scope, concurrency, and disclosure guarantees recorded here.

## Alternatives considered

### Require a CMS-authenticated session

A CMS session would reuse Payload's administrative access control and avoid a separate shared-token lifecycle. It would not allow a preview to be shared with a person who has no CMS account and would conflate editorial access with narrowly scoped preview access.

### Use a reusable expiring preview link

A signed link with a one-hour expiry could avoid persisted consumption state. Anyone who obtained the URL could replay it throughout that hour, however, which conflicts with the requirement that a shared preview be viewable once.

### Expose draft previews without request-specific authorization

An unprotected preview route would be simple but would make unpublished content accessible to anyone who discovered or guessed its URL. Downstream service authentication alone does not protect against that because every visitor request is proxied by the authorized website Worker.

### Use Payload Live Preview

Live Preview can update an editor's view while content is being edited. It is iframe-based, conflicts with the website's `frame-ancestors 'none'` policy, and does not provide the single-use shared-link semantics required here. Direct Admin Preview URLs are selected instead.

### Use a single-use token without revision binding

A token bound only to an item could always show that item's newest draft. That would make the preview change after it was shared and could expose edits the issuer did not intend the recipient to see. Binding the latest saved revision at issuance creates a stable preview snapshot.

## Consequences

Positive consequences:

- A shared link exposes a stable saved revision rather than a moving draft.
- Replay is limited by both the one-hour expiry and successful single-use consumption.
- URL, item, revision, and reference-graph boundaries constrain what a leaked token can expose.
- The CMS remains authoritative for draft access and can validate and consume the token in the same operation that retrieves unpublished data.
- Invalid-preview behaviour does not reveal the existence of unpublished content.
- Direct Preview URLs preserve the accepted anti-framing policy.

Negative consequences:

- Single-use enforcement requires shared state and an atomic operation at the CMS boundary.
- A link scanner, prefetcher, or unintended first requester can consume a valid preview before the intended recipient uses it.
- A website rendering or delivery failure after successful CMS retrieval still spends the token.
- The URL binding depends on consistent normalization when the link is issued and validated.
- Resolving unpublished references expands the disclosure scope beyond the primary document, although only within its bound content graph.
- Editors need to issue a new link for a later revision or another viewing attempt.
- Payload's iframe-based Live Preview cannot be used while `frame-ancestors 'none'` remains in force.

## Revisit conditions

This decision should be reconsidered if:

- Shared review requires several views, several recipients, or a longer-lived collaboration session.
- Link scanners or browser prefetching repeatedly consume tokens before the intended view.
- Editors require iframe-based live updating rather than direct saved-revision previews.
- The accepted Content Security Policy changes to permit the Payload Admin to frame the website.
- Referenced-content graphs become broad enough that their authorization scope is difficult to understand or constrain.
- Preview links must work across several website domains or clients.
- The selected persistence mechanism cannot guarantee atomic consumption under concurrent requests.
- The one-hour expiry proves materially too short or too permissive in use.

## Related documentation

- [Website delivery](../website-delivery.md)
- [Content and publishing](../content-and-publishing.md)
- [Quality and safety](../quality-and-safety.md)
- [Risks and deferrals](../risks-and-deferrals.md)
- [Functional content management](../../functional/content-management.md)
- [ADR 0001: Separate the CMS and public website](0001-separate-cms-and-public-website.md)
- [ADR 0002: Use Payload CMS](0002-use-payload-cms.md)
- [ADR 0007: Use tRPC for website-to-CMS data access](0007-use-trpc-for-website-to-cms-data-access.md)

[Back to architecture decision records](README.md)
