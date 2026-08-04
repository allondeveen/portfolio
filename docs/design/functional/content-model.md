# Content model

This document defines the website's content from a functional perspective, including public and hidden data, relationships, publication behaviour, and validation.

## Primary content types

### Pages

Pages contain information outside a domain such as projects or articles. A page normally represents one concept and may be grouped below a parent page.

| Field | Description | Required | Multiple | Visibility |
| --- | --- | --- | --- | --- |
| ID | Unique page identifier | Yes | No | Private |
| Title | Page title | Yes | No | Public |
| Slug | Unique string identifying the page | Yes | No | Public |
| Summary | Read-only plain-text summary derived from the introduction in the page's hero block | Yes | No | Public |
| Content blocks | Blocks composing the page | Yes | Yes | Public |
| Parent | ID of the parent page | No | No | Public |
| SEO fields | Minimum data needed for search indexing | Yes | No | Public |
| State | `published` or `draft` | Yes | No | Private |
| Publication date | Date and time at which the page becomes public | No | No | Private |

**Relationships:** A page can have one parent page, creating a conceptual hierarchy.

**Publication:** A page can be published, drafted, or private. Its state can change except for the homepage, identified by the `/` slug. Publication can be scheduled; after the scheduled time the page becomes navigable.

**Summary derivation:** Editors do not edit the summary separately. The system derives it from the hero introduction by removing presentation-specific formatting. Changes to the introduction automatically update the summary. Overview pages, related-content blocks, and article-reference blocks consume this derived value. The technical design defines the conversion from rich text to plain text. Presentation contexts may truncate the summary without changing its stored or derived value.

The summary is the default SEO description. When the SEO fields contain a custom description, that description overrides the summary for SEO only.

**Rules**

- The system generates an alphanumeric ID.
- The slug is unique.
- Published content contains a hero block with a non-empty introduction.
- Publication fails when the system cannot derive a summary.
- Changing a slug creates a redirect.

The agentic-search page is a Page managed through this collection and published at `/search`. It is the documented exception to the Hero and derived-summary requirements: it uses the normal header and page-owned introductory content blocks but does not render a Hero. The `/search` route composes that content with its route-specific AI interface; the interface is not stored as a content block.

### Projects

Projects are engineering case studies.

| Field | Description | Required | Multiple | Visibility |
| --- | --- | --- | --- | --- |
| Page fields | Every page field except `Parent` | - | - | - |
| Technologies | Applicable topics, such as technologies used | Yes | Yes | Public |
| Clients | Clients for whom the project was implemented | Yes | Yes | Public |

Projects do not relate to a parent page. Technologies are domain-specific topics; a project can use several. A project can relate to several clients, and a client can relate to several projects.

Projects inherit page publication behaviour. Only published projects can be featured.

### Articles

Articles provide in-depth information on technical subjects.

| Field | Description | Required | Multiple | Visibility |
| --- | --- | --- | --- | --- |
| Page fields | Every page field except `Parent` | - | - | - |
| Series | Series containing this article | No | No | Public |
| Subjects | Topics discussed by the article | Yes | Yes | Public |

Articles do not relate to a parent page. Subjects are domain-specific topics, and an article can cover several interlinked subjects.

An article can belong to an ordered series. Series support navigation between related articles.

Articles inherit page publication behaviour. Only published articles can be featured or reached through series blocks.

## Supporting content types

### Clients

Clients represent organisations for which projects were completed. They are referenced by projects rather than exposed as dedicated public pages, preventing duplication and supporting future features such as client blocks or testimonials.

| Field | Description | Required | Multiple | Visibility |
| --- | --- | --- | --- | --- |
| ID | Unique client identifier | Yes | No | Private |
| Name | Client name | Yes | No | Public |

Clients use the project-client relationship. They are public immediately without a draft state. The system generates an alphanumeric ID.

### Series

A series classifies an ordered set of articles about the same subject. It is not directly navigable as a public page; it supports navigation among its articles.

| Field | Description | Required | Multiple | Visibility |
| --- | --- | --- | --- | --- |
| ID | Unique series identifier | Yes | No | Private |
| Title | Series title | Yes | No | Public |
| Articles | Ordered articles in the series | Yes | Yes | Public |

Series use the article-series relationship. They are public immediately without a draft state. The system generates an alphanumeric ID.

### Topics

Topics classify primary content. They represent subjects for articles and principal technologies, concepts, or domains for projects.

| Field | Description | Required | Multiple | Visibility |
| --- | --- | --- | --- | --- |
| ID | Unique topic identifier | Yes | No | Private |
| Name | Topic name | Yes | No | Public |
| Parent | Parent topic ID | No | No | Public |

A topic can have one parent topic. Filtering by a parent includes content classified with its descendants; filtering by a child excludes its parent and sibling topics. For example, filtering by React includes State management, while filtering by State management does not include every React item.

Topics use project-topic and article-topic relationships. They are public immediately without a draft state. The system generates an alphanumeric ID.

### Menu

Menus define navigation independently from page hierarchy.

| Field | Description | Required | Multiple | Visibility |
| --- | --- | --- | --- | --- |
| ID | Unique custom menu identifier | Yes | No | Private |
| Items | Ordered menu items | Yes | Yes | Public |

Each menu item contains:

| Field | Description | Required | Multiple | Visibility |
| --- | --- | --- | --- | --- |
| ID | Unique item identifier | Yes | No | Private |
| Label | Item label | Yes | No | Public |
| Destination | Internal resource ID or complete external URL | Yes | No | Public |
| Index | Position in the menu | Yes | No | Public |
| Parent | Parent menu-item ID | No | No | Public |

Menu items can be hierarchical. Menus are public immediately without a draft state, while items respect the publication state of their destination. The system generates alphanumeric IDs.

## Infrastructure and operational types

### Media

Media manages images, videos, and documents.

| Field | Description | Required | Multiple | Visibility |
| --- | --- | --- | --- | --- |
| ID | Unique media identifier | Yes | No | Private |
| Name | Media name | Yes | No | Public |
| File | Media file | Yes | No | Public |
| File type | Type such as image, video, or PDF | Yes | No | Public |
| Alternative text | Fallback and accessibility text | Yes | No | Public |
| Caption | Description of the media | No | No | Public |
| Credits | Required author or organisation credit | No | No | Public |

Media has no direct content relationships and is consumed by blocks. It is public immediately without a draft state.

**Rules**

- The system generates an alphanumeric ID.
- Required credits must be provided.
- Every file requires alternative text.
- The type is normally derived from the uploaded file.

### Forms

Forms let editors configure reusable forms without developer involvement.

| Field | Description | Required | Multiple | Visibility |
| --- | --- | --- | --- | --- |
| ID | Unique form identifier | Yes | No | Private |
| Title | Form title | Yes | No | Public |
| Settings | Form settings | No | No | Public |
| Fields | Ordered form fields | Yes | Yes | Public |

Supported field types include text, text area, options, checkboxes, file upload, select, number, boolean, and number range. Most fields require a label; option-based fields also require label-value choices.

Settings contain:

| Field | Description | Required | Multiple | Visibility |
| --- | --- | --- | --- | --- |
| Messages | Block-composed post-submission messages | No | Yes | Public |
| Notifications | Emails sent after submission | No | Yes | Public |

Forms are consumed by blocks, and their entries are stored as form submissions. Forms are public immediately without a draft state. The system generates an alphanumeric ID.

### Form submissions

Form submissions store immutable entries. Technical status tracking belongs in the technical design.

| Field | Description | Required | Multiple | Visibility |
| --- | --- | --- | --- | --- |
| ID | Unique submission identifier | Yes | No | Private |
| Form | ID of the submitted form | Yes | No | Public |
| Submitted values | Fields and values at submission time | Yes | Yes | Public |
| Files | Uploaded files | No | Yes | Public |

Submissions relate to the form that created them. They are visible only to CMS editors and never published. The system generates alphanumeric IDs, and only the system can alter submission data.

### Redirects

Redirects send a request to another location and let editors manage moved or replaced content.

| Field | Description | Required | Multiple | Visibility |
| --- | --- | --- | --- | --- |
| ID | Unique redirect identifier | Yes | No | Private |
| From | Request to redirect | Yes | No | Public |
| To | Destination | Yes | No | Public |
| Active | Whether the redirect is active | No | No | Public |

Redirects are standalone and are used by the system rather than published. Only CMS editors can access them.

**Rules**

- The system generates an alphanumeric ID.
- `From` is a complete URL and path.
- `To` is a complete URL and path or a path on the portfolio's own domain.

## Singular content types

Singular types have one instance, no relationships, and are published immediately without a draft state.

### Header and footer

Each contains a required, repeatable `Content blocks` field. The blocks construct the global header or footer. Only blocks allowed for these regions may be used.

### Project page after-content blocks

An optional, repeatable `Content blocks` field supplies content shown after every public project's authored content and before the footer.

### Article page before-content blocks

An optional, repeatable `Content blocks` field supplies content shown after every public article's hero and before its authored content.

### Article page after-content blocks

An optional, repeatable `Content blocks` field supplies content shown after every public article's authored content and before the footer.

### Not found

| Field | Description | Required | Multiple | Visibility |
| --- | --- | --- | --- | --- |
| Title | Communicates that a resource cannot be found | Yes | No | Public |
| Content blocks | Construct the not-found page | Yes | Yes | Public |

### Error page

| Field | Description | Required | Multiple | Visibility |
| --- | --- | --- | --- | --- |
| Title | Communicates that an error occurred | Yes | No | Public |
| Content blocks | Construct the error page | Yes | Yes | Public |

### Site settings

| Field | Description | Required | Multiple | Visibility |
| --- | --- | --- | --- | --- |
| Site title | Title of the portfolio website | Yes | No | Public |
| Support email address | Address for technical issues | Yes | No | Public |
| Social image | Image used in SEO metadata | Yes | No | Public |

The support address must be valid and different from both form-notification recipients and any contact-block address.

[Back to functional design](README.md)
