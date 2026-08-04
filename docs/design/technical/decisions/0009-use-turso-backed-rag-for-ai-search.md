# ADR 0009: Use Turso-backed RAG for AI search

> **Status: Accepted**
>
> **Decision state:** The capability, Turso storage boundary, eligible content, hierarchical chunking, ingestion timing and recovery, freshness guard, hybrid-search and context-selection policy, minimum-evidence behaviour, anonymous session and rate-limit model, degraded behaviour, logging boundary, and structured-response boundary, query-mode selection, response schema, generation, and safety choices are accepted.
>
> **Scope:** The complete AI-search architecture, including content eligibility, ingestion, indexing, retrieval, generation, structured responses, sessions, limits, safety, failures, and operations.

## Context

AI search replaces a classical search-results page with an interface that can answer questions using portfolio content. It must support conversational questions as well as regular search queries that need an overview of matching results.

The website renders CMS-managed pages through content blocks. Generated explanatory parts of AI-search responses should reuse that rendering vocabulary, while the prompt, conversation, streaming state, failures, and conventional result overview belong to one route-specific AI interface. The response must therefore be machine-readable and suitable for validation by that interface.

The complete AI-search design belongs in this record so ingestion, retrieval, generation, presentation, safety, and operations are evaluated as one architecture. Technical-design documents retain only the boundaries needed to explain how AI search connects to the rest of the system.

Payload content and the AI-search index are separate persistence systems. Index updates cannot be committed atomically with CMS saves, so the design must prevent delayed background work from restoring content that has since been unpublished or deleted.

## Decision

### Capability and execution boundary

- AI search is a full retrieval-augmented generation feature, not only a vector-search or index-synchronization mechanism.
- `GET /search` serves the initial AI-search page through the normal website content-delivery path.
- `POST /api/ai` executes AI search on the website server.
- The query phase accesses Turso directly and invokes an OpenAI language model using server-side credentials.
- Payload CMS supplies eligible published portfolio content to the ingestion and indexing process.
- The AI-search page and API responses are not cached.
- The AI interface is a client-side, route-specific component and is not a CMS content block. Every website content block is mapped on the server and delivered as static output.

### Vector, lexical, and relational storage

Turso stores the AI-search chunks, relational hierarchy and metadata, full-text search data, and vector embeddings. Keeping these representations in one relational database supports lexical and vector candidate retrieval as well as parent lookup without introducing a separate search index for each responsibility.

- Staging and production use separate Turso Cloud databases backed by libSQL.
- Development uses a local embedded libSQL database, referred to by the project as its Turso Embed setup, and does not share the staging or production database.
- The next-generation Turso Database engine formerly known as Limbo is not used in development, staging, or production.
- The website query path connects to the environment's configured Turso database through server-only configuration.
- Turso URLs, credentials, and other environment-specific values remain outside source code.
- D1 remains the authoritative CMS database. Turso contains a derived search representation and is not a second source of truth for publication state.

### Structured AI-interface responses

Every model answer uses events. Events are JSON objects that describe how the AI interface should construct its temporary response model. Generated explanatory content is represented with supported shared content blocks and uses the same block renderer as pages, articles, and projects. Conventional search results are represented by the AI interface's route-specific overview rather than by a content block. There is no free-form model output; every transfer of model-generated information in the answer stream is an event.

#### Event protocol

The model will return events in JSON format. The events are:

- **start-block**: Creates a new block and pushes it into the current block stack. The schema includes the block type and any supported initial properties.
- **start-child-blocks**: Creates a new stack so that each `start-block` is added as a child. Only works for `list` and `callout`.
- **end-child-blocks**: Leaves the current child stack.
- **aggregate-text**: Appends text or citations to the current text block.
- **aggregate-props**: Appends data to an aggregatable property of the current block. The schema matches the available props for the targeted event.
- **end-block**: Leaves the current block stack.
- **end**: The end of the stream.

Each event's schema includes the above event's name in `event`, and `data`. The streamed events are not rendered directly. Instead, they are incrementally applied to a temporary AI-interface response model. Supported generated content blocks within that model use the regular CMS block renderer; route-specific interface state does not. Every event is validated against its schema and context before being applied. Invalid events terminate the response according to the retry policy. The event protocol is versioned independently of the renderer and model implementation.

##### Aggregate props

This event's schema includes `prop` and `data`. For generated content blocks, it can apply only to properties that encapsulate a collection, such as a table's `rows`.

#### Validation boundary

Raw model output does not cross the website-server trust boundary. Events are parsed and contextually validated on the server before being forwarded. The client validates the public event contract defensively before applying events to its temporary response model.

#### Supported generated block types

These are the blocks the model may use in its response:

##### Text blocks

- Heading (with size 2 to 6)
- Rich text
- List
- Image
- Code
- Table
- Metric

##### Callout

A callout block. The urgency can be provided by the AI. Can include the following children:

- Heading
- Rich text
- List
- Image
- Code
- Table
- Metric

#### Route-specific result overview

The AI interface owns one conventional search-results overview component. It is not part of the CMS content-block contract and is not registered with the shared block renderer. The server supplies validated, published result references and resolves trusted fields such as titles, summaries, canonical URLs, and asset locations. How the response envelope carries those result records alongside streamed generated content is an implementation detail of the AI-interface contract.

#### Generated and referenced content

- Generated blocks contain model-authored explanatory presentation content.
- Referenced blocks identify existing published portfolio content by stable ID.
- Resolved fields, including canonical URLs and asset locations, are supplied by the server rather than trusted from model output.

### Streaming and response commitment

Streamed blocks are provisional until a valid end event is received. Only completed and fully validated responses are committed to conversation history. Partial output may be displayed provisionally but is discarded on failure.

### Indexing eligibility

Only published content in the following scope is eligible:

- Projects contribute their eligible body content, technology topics, content type, and canonical URL.
- Articles contribute their eligible body content, topics, content type, and canonical URL.
- The contact page contributes its eligible body content, content type, and canonical URL so AI search can answer how to make contact.

All other pages are currently excluded. Series, clients, media, menus, forms, form submissions, templates, redirects, fixed templates, and site settings are also excluded.

Topic and technology names are stored as semantic metadata associated with their eligible articles and projects. Menu, grid, stack, container, and group blocks are not indexed as independent chunks. Eligible nested blocks inside those composed blocks remain eligible under the same rules.

Draft and unpublished content is never eligible for query results. Preview content is not indexed.

### Ingestion timing and freshness

Publishing or updating eligible content schedules ingestion in a background process so embedding and index work does not extend the CMS save handler. The location and execution technology of that process are implementation choices constrained by the guarantees in this ADR.

Unpublishing or deleting eligible content is different: deletion from Turso runs synchronously as part of the CMS save handler. This minimizes the period in which content that is no longer public can be retrieved.

If synchronous Turso deletion fails, unpublishing or deletion in Payload still succeeds. The stale search data is repaired by the background ingestion and reconciliation process rather than blocking the CMS save.

Every ingestion job carries a stable source-content identifier and the source revision or generation that caused it. Before writing chunks, the job verifies that the source still exists, is publicly eligible, and has the same current revision or generation. A stale job must exit without writing.

The index also retains enough current-generation or deletion state to prevent an older queued job from recreating chunks after synchronous unpublishing or deletion. The exact representation may use a generation record or tombstone, but it must provide that guarantee. Replacing the chunks for one source version must not leave chunks from an older version queryable.

Each background job has at most four execution attempts. A failure after the final attempt is logged. Retry timing and the background-processing technology remain implementation details.

Every job run reconciles Payload and Turso using stable source identity, current publication eligibility, and the last-edited timestamp. A source that is missing or no longer eligible is removed from Turso. When an eligible source is new or its Payload last-edited timestamp is newer than the indexed version, the complete source is normalized, chunked, embedded, and re-ingested. The new complete chunk set replaces the old source chunk set; incremental field- or chunk-level change detection is not required.

If the background job processor completes no successful processing for one continuous hour, an operational alert is produced. Reconciliation on later successful runs repairs missed updates, failed synchronous deletions, and partial or exhausted ingestion attempts.

### Hierarchical layout-aware chunking

Eligible content uses hierarchical layout-aware chunking with semantic metadata enrichment.

- The CMS block structure supplies the primary semantic boundaries rather than flattening a page into undifferentiated text.
- Every chunk retains a relationship to its source page.
- Structural blocks such as heroes, text sections, text-with-media blocks, and chapters retain their hierarchical parent relationships.
- Technical structures for which hierarchy affects meaning, including tables, retain equivalent parent relationships.
- A long textual block may be split into smaller child chunks with a token overlap of 10–15 percent.
- Overlap applies only between adjacent splits of the same textual block. It does not cross unrelated block boundaries or duplicate complete structural blocks such as heroes or tables.
- Small blocks that already form a coherent retrieval unit are not split merely to create overlap.

Chunk records include the information required for semantic retrieval and reliable synchronization:

- Stable source-content ID
- Source revision or generation
- Canonical URL
- Content type: `article`, `project`, or `page`
- Topics or technologies where applicable
- Block type
- Block position or structural path
- Parent-chunk ID where applicable
- Heading or structural label where applicable
- Publication eligibility
- Content hash
- Embedding model and embedding version

Exact chunk-size thresholds, tokenizer selection, embedding model, vector dimensionality, and which individual block fields contribute text are implementation and calibration choices.

### Search and context retrieval

Search executes a hybrid sequence:

1. Apply mandatory eligibility and freshness filters and any explicit or high-confidence semantic metadata filters.
2. Retrieve the top 20 lexical child chunks and the top 20 vector child chunks from Turso.
3. Combine those lists using equally weighted Reciprocal Rank Fusion.
4. Retain approximately the top 8–10 fused child chunks before grouping them by structural parent.
5. Aggregate children belonging to the same parent, substitute the required parent context, and deduplicate the resulting parents.
6. Select approximately 4–6 final evidence units within the model-context budget.
7. Supply the selected evidence to the generation phase only when it satisfies the minimum-evidence policy.

This supports exact-term and conventional portfolio searches as well as semantic questions. Relational parent substitution allows a precise child match to lead to a coherent structural context instead of sending an isolated fragment to the model.

The candidate counts are configurable evaluation defaults. They do not increase automatically or proportionally with the total number of portfolio chunks. If evaluation shows that relevant evidence frequently falls below the top 20, each initial pool may increase modestly while the fused and final context limits remain bounded. Stronger filtering, oversampling before parent grouping, or a reranking stage should be evaluated before allowing corpus growth to expand the model context.

### Query interpretation ownership

Query interpretation may propose normalized search terms, semantic metadata filters, and a response mode. The server validates all proposed filters against known metadata and applies inferred hard filters only when confidence requirements are met.

### Retrieval filters

Public eligibility and the current source generation are mandatory pre-retrieval filters. Draft, unpublished, deleted, superseded, and stale-generation chunks cannot participate in either retrieval channel.

Content type, topic, and technology filters are applied before retrieval only when they are explicit in the request or inferred with high confidence. An uncertain inferred filter is not applied because an incorrect hard filter would remove potentially relevant evidence. Invalid or unknown metadata values are ignored.

### RRF weighting and parent aggregation

Lexical and vector rankings have equal weight. This avoids assuming that exact-term or semantic retrieval is generally more reliable before evaluation demonstrates such a difference. Query-dependent weighting is not part of the initial design.

RRF ranks child chunks before parent substitution. Ranking the precise child matches first preserves the evidence found by each retrieval channel and prevents repeated parent documents from influencing fusion prematurely.

When several fused children belong to the same structural parent:

- The best child score forms the parent's base score.
- A limited, diminishing bonus is added for a small number of additional matching children.
- The bonus is capped so a large parent cannot dominate merely because it contains more chunks.
- Every contributing child identifier and match location is retained as provenance for the parent evidence.

The exact RRF constant, relevance thresholds, support-bonus formula, and bonus cap are tunable configuration selected through retrieval evaluation rather than separate architecture decisions.

### Parent substitution and deduplication

Parent substitution occurs only after child-level RRF and grouping. Each substituted parent is emitted once using the stable source-content ID, source generation, and structural parent ID as its identity.

When the same parent is found through several children or both directly and through a child, the results are merged. The merged parent retains the aggregated score, strongest match, and all contributing child provenance. Separate structural parents from the same page remain separate when they represent distinct sections. Text equality is not used for identity because different sections can legitimately contain identical text.

### Context limits

Parent substitution does not automatically insert the complete source page. The initial context-selection policy is:

- Include the matched structural parent and the matched child within it.
- Include at most one adjacent sibling on either side when continuity requires it.
- Do not cross into an unrelated block or structural parent.
- Include table headings with matched rows.
- Include a complete table only when it fits within the total context budget.
- Select approximately 4–6 final evidence units.
- Limit retrieved evidence to approximately 3,000–5,000 tokens in total.
- Apply a per-parent limit so one article, project, or page cannot consume the entire context budget.

These are starting limits. They may be calibrated with the selected generation model and prompt-history budget, but corpus growth does not by itself justify increasing them.

### Minimum evidence

RRF rank is relative and does not by itself establish that a match is relevant. Generation therefore requires at least one current eligible result that passes the configured lexical or vector relevance threshold and directly supports the material claim being generated.

Evidence requirements depend on the response:

- A search-results overview requires one or more relevant ranked results.
- A specific factual answer may use one strong, directly supporting authoritative source, such as the contact page for contact details.
- A broad synthesized answer requires supporting evidence from multiple chunks or sources unless one source answers it comprehensively.
- Claims without direct retrieved support are not generated.

When the minimum evidence is not met, the endpoint still returns the machine-readable event contract but does not invent an answer. It may use that contract to state that the portfolio contains insufficient information, present potentially related results, or request clarification.

### Citation and provenance

Every evidence unit supplied to generation receives an opaque identifier. The model may cite only those identifiers. The server resolves valid identifiers into canonical source references and rejects unknown or unavailable citations. The model does not generate trusted URLs directly. Search results in overviews don't have to be cited.

### Generation orchestration

The initial implementation uses deterministic retrieval followed by one structured generation phase. The generation model cannot initiate additional retrieval or execute an open-ended tool loop.

### Safety and content trust

AI search separates three trust domains:

- User input determines the user's request but cannot modify application policy, retrieval rules, response schemas, or model capabilities.
- Retrieved portfolio content is evidence, not instruction. Instruction-like text in indexed content is treated as ordinary evidence and cannot override system behaviour.
- Model output is untrusted generated data. It is accepted only through the structured event protocol and must pass schema, context, reference, and citation validation before rendering.

The model receives only:

- application-controlled instructions;
- the current request and permitted conversation history;
- eligible retrieved evidence;
- the supported response schema.

The model has no direct access to databases, credentials, environment data, arbitrary network resources, application services, or unrestricted tools. Retrieval, reference resolution, validation, and authorization remain server-controlled.

AI search is a grounded portfolio interface rather than a general-purpose assistant. Portfolio-specific factual claims require supporting eligible evidence. Requests outside the supported scope, requests lacking sufficient evidence, or requests attempting to bypass these trust boundaries return a structured refusal, clarification request, or scope-limited response instead of an unrestricted generated answer.

Prompt injection is treated as a residual risk rather than a solved problem. The architecture limits its impact by constraining model capabilities, separating trusted instructions from evidence, and validating all generated output before rendering.

### Conversation state

Prompt and response content may exist temporarily as session state for the page lifetime but is not written to operational logs or persistent analytics storage.

### Sessions and usage limits

- Prompts are limited to five requests per minute and thirty requests per day for each user.
- Each visitor may have only one AI-search session.
- A visitor is identified through cryptographic hashing of the request IP address. The derived identity, rather than the raw IP address, keys session and rate-limit state.
- Prompt history is stored in atomic state so streaming updates cannot create conflicting session history.
- Prompt history lasts only for the current page lifetime and resets when the visitor refreshes the page.
- Refreshing the page does not reset the visitor's rate-limit state because that state is keyed by the cryptographic IP identity rather than prompt history.
- Every accepted request timestamp is stored with the visitor identity. The preceding one-minute and one-day request windows are calculated from that timestamp state.
- A request that exceeds either limit fails before search or generation begins. The response includes the remaining waiting period and an error message.
- While rate-limited, the interface displays the error and locks prompt input until the returned waiting period ends.
- A visitor-initiated retry after an embedding, generation, streaming, timeout, or structured-output failure remains subject to the same rate limits and counts as another request when accepted.

The exact hash algorithm, secret or salt lifecycle, atomic-state implementation, and timestamp-storage mechanism remain implementation details subject to the security and privacy requirements of this ADR.

### Failure and degraded behaviour

If Turso or the language-model service is unavailable, AI search enters a temporarily unavailable state. The server rejects further AI-search requests while that dependency is known to be unavailable, and the complete search interface displays the temporary-unavailability state. Dependency-health detection and recovery probing are implementation details.

If query-embedding generation fails or a request times out, the interface displays an error message with a retry button. If answer generation fails after sufficient evidence was retrieved, it uses the same error presentation; the visitor is not shown a more detailed internal failure classification.

If streaming fails after partial output has been displayed, that partial output is removed and replaced with an error-message state containing a retry button. Partial generated output is not retained as a completed answer.

If the generated structured response is invalid, the stream is cancelled and the interface displays the same retryable error state. The system does not render the invalid response and does not attempt an automatic repair within that request.

All retry actions remain subject to the normal rate limits.

### Logging and privacy

Prompts, retrieved passages, and generated answers are not logged. Logs contain operational metadata only, such as request complexity, token counts, timings, failure category, and trace context. AI usage continues to be counted under the cross-cutting observability requirements without retaining the content of the interaction.

## Alternatives considered

### Use Cloudflare Vectorize

Vectorize would provide a managed vector index integrated directly with Cloudflare Workers and would avoid adding another provider. It supports vector metadata and metadata filtering.

It was not selected because the chosen retrieval design also needs full-text search, relational chunk hierarchy, parent substitution, generation and tombstone state, and flexible metadata queries. Turso keeps those records and vector embeddings in one relational system, which is a better fit for this architecture even though it adds an external provider and network boundary.

### Use D1 for the AI-search index

D1 already stores authoritative CMS data and would avoid another provider. It was not selected as the vector-search store because ADR 0005 limits D1 to Payload relational persistence, while this feature requires a vector and hybrid-search representation optimized independently from the CMS schema.

### Process every index update synchronously

All embedding and indexing work could run in the CMS save handler. This would provide a simple ordering boundary but would make ordinary publishing and editing depend on embedding latency and every AI-search provider operation. Background ingestion keeps that work outside the save path.

Synchronous removal remains selected for unpublishing and deletion because continuing to retrieve non-public content is a more serious correctness problem than temporarily serving an older version of still-public content.

### Process deletion only in the background

Unpublishing and deletion could enqueue the same asynchronous work as publication updates. This would keep all index operations uniform but would knowingly leave ineligible content retrievable until the job ran. It was not selected.

### Use flat fixed-size chunks

Content could be flattened and split only by token count. This would be simpler, but it would discard meaningful CMS block and heading boundaries, weaken parent context, and split structured content without regard to layout. The block-based content model provides stronger semantic boundaries at little additional modelling cost.

### Use vector retrieval without lexical search

Vector-only retrieval would simplify query execution but would be weaker for exact titles, technology names, contact terms, and conventional keyword searches. Hybrid retrieval supports both search styles through one index.

### Free-form text responses

Not selected. Free-form text cannot reliably drive the shared content-block renderer or provide a consistent machine-readable results overview.

### Separate response contracts for conversational and regular search

Not selected. A single structured content-block contract keeps rendering and validation consistent across both query styles.

### Retrieval without generation

Not selected as the complete feature. It can return matching documents but does not satisfy the conversational-answer requirement. Retrieval remains part of the RAG pipeline and supplies the route-specific result overview when appropriate.

### Generation without retrieval augmentation

Not selected. Answers must be grounded in eligible portfolio content rather than relying only on the model's general knowledge.

### Allow unrestricted general-purpose answers

The model could answer unsupported requests using its general knowledge when portfolio evidence is insufficient.

It was not selected because AI search is intended to explain and navigate the portfolio. Unrestricted answers would weaken the evidence boundary, reduce citation reliability, and blur the distinction between portfolio knowledge and general model knowledge.

## Consequences

Positive consequences:

- Turso combines relational hierarchy, metadata, full-text retrieval, and vector retrieval in one derived search store.
- The same database can support RRF candidates and relational parent substitution.
- CMS block boundaries and hierarchy are retained instead of being lost during flattening.
- Overlap improves continuity within long text without duplicating unrelated blocks.
- Background ingestion keeps normal publication saves independent from embedding latency.
- Synchronous unpublishing and deletion reduce exposure of content that is no longer public.
- The freshness guard prevents delayed ingestion from restoring an older or deleted source generation.
- Four-attempt background processing and complete-source reconciliation repair missed, failed, and partially applied ingestion work.
- CMS unpublishing and deletion are not blocked by Turso availability.
- Equal-weight hybrid retrieval supports exact and semantic matches without requiring score normalization between the channels.
- Bounded candidate and context limits prevent corpus growth from increasing model input automatically.
- Minimum-evidence requirements prevent relative rank alone from authorizing unsupported generation.
- Cryptographic IP identities allow anonymous session and rate-limit enforcement without using a visitor account.
- Prompt history remains atomic during streaming and is discarded on page refresh.
- Prompt, passage, and answer content is excluded from logs.
- AI-search output can use the same rendering vocabulary as CMS-managed content.
- Conventional result overviews and conversational answers share one endpoint and AI interface, while generated content blocks continue to use the shared block renderer.

Negative consequences:

- Turso introduces another provider, database, credential boundary, network dependency, and operational surface alongside Cloudflare.
- The derived Turso index is eventually consistent for new and updated public content.
- CMS and Turso writes cannot be one transaction, so freshness guards and recovery procedures are required.
- A failed synchronous deletion can leave unpublished content temporarily retrievable until reconciliation succeeds.
- Complete-source re-ingestion repeats chunking and embedding work even when only a small part of a source changed.
- A four-attempt limit can leave the index stale until a later reconciliation run.
- Hierarchical chunking and parent substitution are more complex than flat vector retrieval.
- The chosen overlap can create duplicate evidence if splitting and deduplication are implemented incorrectly.
- Development uses a local embedded libSQL boundary while staging and production use remote Turso Cloud, so both modes require compatibility verification.
- Model output becomes untrusted structured input and must be schema-validated before rendering.
- Search quality depends on ingestion freshness, lexical and vector retrieval, fusion, context selection, prompt construction, and structured-output reliability together.
- Candidate counts, scoring constants, relevance thresholds, parent bonuses, and context limits require evaluation and calibration.
- Cryptographic IP identity can group visitors who share a public IP address and depends on secure hash configuration.
- Refreshing the page discards conversational history even though rate-limit state remains.
- Replacing partial streamed output with an error sacrifices potentially useful text to avoid presenting an incomplete answer as valid.
- Excluding prompts, passages, and answers from logs protects interaction content but limits production debugging and answer-quality investigation.
- The feature requires explicit safety, privacy, cost, latency, observability, and degraded-behaviour design.

## Revisit conditions

Revisit the resolved parts of this decision if:

- Turso's Worker compatibility, full-text search, vector search, latency, availability, pricing, or relational behaviour cannot meet the feature requirements.
- Local embedded libSQL behaves materially differently from Turso Cloud for the accepted schema or queries.
- Index freshness failures repeatedly expose unpublished content or omit current content.
- Reconciliation or the four-attempt retry limit does not restore acceptable index freshness.
- Synchronous deletion makes CMS saves unreliable or too slow.
- Hierarchical chunking or parent substitution performs worse than a simpler chunking strategy in retrieval evaluation.
- Relevant evidence repeatedly falls outside the configured candidate pools or a reranking stage becomes necessary.
- Equal lexical and vector weighting performs materially worse than evaluated static or query-dependent weighting.
- The bounded parent and context policy omits necessary evidence or consumes excessive model context.
- The selected overlap materially increases duplicate retrieval or context use.
- The model cannot reliably produce the required structured response.
- The shared content-block contract proves unsuitable or unsafe for generated responses.
- Separate conversational and conventional-search contracts become materially simpler or more reliable.
- Retrieval quality, latency, operating cost, or provider constraints make the selected RAG architecture unsuitable.
- AI search moves out of the website Worker or must support additional clients.
- Cryptographic IP identity causes unacceptable collisions, privacy concerns, or rate-limit evasion.
- Content-free operational logging is insufficient to diagnose recurring retrieval or generation failures.

## Related documentation

- [Architecture overview](../architecture-overview.md)
- [Content and publishing](../content-and-publishing.md)
- [Website delivery](../website-delivery.md)
- [Development and operations](../development-and-operations.md)
- [Risks and deferrals](../risks-and-deferrals.md)
- [Functional public website](../../functional/public-website.md)
- [ADR 0005: Use Cloudflare D1 for relational storage](0005-use-cloudflare-d1-for-relational-storage.md)

[Back to architecture decision records](README.md)
