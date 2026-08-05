# Architecture decision records

This directory contains architecture decision records (ADRs) for consequential technical choices.

ADRs 0001 through 0010 record accepted, written decisions.

## Contents

| ADR                                                                                                                                                   | Decision state | Documentation state |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ------------------- |
| [0001 — Separate the CMS and public website](0001-separate-cms-and-public-website.md)                                                                 | Accepted       | Written             |
| [0002 — Use Payload CMS](0002-use-payload-cms.md)                                                                                                     | Accepted       | Written             |
| [0003 — Use React Router Framework](0003-use-react-router-framework.md)                                                                               | Accepted       | Written             |
| [0004 — Deploy on Cloudflare Workers](0004-deploy-on-cloudflare-workers.md)                                                                           | Accepted       | Written             |
| [0005 — Use Cloudflare D1 for relational storage](0005-use-cloudflare-d1-for-relational-storage.md)                                                   | Accepted       | Written             |
| [0006 — Use Cloudflare R2 for object storage](0006-use-cloudflare-r2-for-object-storage.md)                                                           | Accepted       | Written             |
| [0007 — Use tRPC for website-to-CMS data access](0007-use-trpc-for-website-to-cms-data-access.md)                                                     | Accepted       | Written             |
| [0008 — Use Cloudflare CDN caching with targeted publication invalidation](0008-use-cloudflare-cdn-caching-with-targeted-publication-invalidation.md) | Accepted       | Written             |
| [0009 — Use Turso-backed RAG for AI search](0009-use-turso-backed-rag-for-ai-search.md)                                                               | Accepted       | Written             |
| [0010 — Use single-use tokens for shared previews](0010-use-single-use-tokens-for-shared-previews.md)                                                 | Accepted       | Written             |

## When to use an ADR

Create an ADR when a decision:

- Is difficult or expensive to reverse.
- Affects multiple components or areas of the system.
- Establishes an architectural constraint that future work must respect.
- Has meaningful alternatives or trade-offs.
- Carries notable operational, security, privacy, performance, or cost consequences.
- Is likely to be questioned or reconsidered later.

Do not create an ADR for routine implementation details, exact CMS field definitions, ordinary framework configuration, or a choice that is both local and inexpensive to change. Record those details in the relevant technical-design document or implementation instead.

The technical-design documents describe how the accepted architecture works. ADRs explain why consequential choices were made. When an ADR changes the current architecture, update the affected technical-design documents after the decision is accepted.

## Linking ADRs and design documentation

Technical-design documents should link directly to the ADRs that explain their consequential choices instead of referring generically to “the ADRs.”

When an ADR is written, its related-documentation section should link to:

- The technical-design documents affected by the decision.
- The functional requirements or functional-design sections that created the need for the decision.
- Other ADRs that constrain, depend on, or supersede it.

Do not add speculative links to placeholder ADRs. Add these links while writing or reviewing the record, when its actual scope and relationships are known. When an accepted ADR changes the architecture, update both sides of the relationship: the ADR and the affected technical-design documents.

## Record structure

Each ADR contains:

- **Status:** the lifecycle state of the record.
- **Context:** the problem, constraints, and forces that require a decision.
- **Decision:** the selected option and its important boundaries.
- **Alternatives considered:** credible alternatives and why they were not selected.
- **Consequences:** positive effects, negative effects, risks, and follow-up work.
- **Revisit conditions:** events or evidence that should cause the decision to be reconsidered.
- **Related documentation:** links to affected design documents, requirements, and other ADRs.

## Lifecycle

Use these statuses:

- **Placeholder:** the ADR structure exists, but the record has not been written.
- **Proposed:** the context and candidate decision are ready for review.
- **Accepted:** the decision has been agreed and governs the architecture.
- **Rejected:** the proposed decision was considered but not adopted.
- **Superseded:** a later ADR replaces the decision.

Do not rewrite the outcome of an accepted ADR when the architecture changes. Create a new ADR, mark the earlier record as superseded, and link the two records. Small corrections that do not change the decision may be made in place.

## Numbering and naming

- Assign numbers sequentially and never reuse a number.
- Use four-digit numbers and a short descriptive filename.
- Keep the ADR focused on one consequential decision.
- Write titles as decision statements when the outcome is known and as decision questions or “choose” statements while the decision remains open.

[Back to technical design](../README.md)
