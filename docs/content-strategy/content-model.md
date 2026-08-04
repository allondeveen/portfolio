# Content model

This document describes the kinds of content that exist on the website and how that content is composed.

## Content types

The sitemap is made up of three content types: pages, projects, and articles.

### Pages

Pages are the generic content type. They may have relationships with other pages, but not a domain-specific relationship like projects or articles. When pages have relationships, these are parent-child relationships.

**Characteristics**

- May be included in menus.
- Are composed using content blocks.
- May contain links to projects, articles, and external websites.
- End with a call to action.

**Examples**

- Homepage
- Contact

### Projects

Projects describe the work in the portfolio. They serve as case studies of engineering ability and senior-level thinking.

**Characteristics**

- Are usually not included in menus.
- Are composed using content blocks.
- Can be featured on the homepage.
- Contain an engineering-focused narrative.
- End with a contact call to action.

**Typical content**

- Project, company, or client context
- Goal
- Constraints
- Architecture
- Technical challenges
- Trade-offs
- Result
- Reflection

### Articles

Articles communicate in-depth knowledge to clients, other developers, and software companies. They serve the knowledge-sharing goal of the portfolio and should demonstrate senior-level thinking through educational content.

**Characteristics**

- Are usually not included in menus.
- Can reference projects.
- Can be featured on the homepage.
- Contain educational content.
- Are categorised by topic.
- May be grouped into series to help readers progressively explore a larger subject.
- End with a contact call to action.

**Typical content**

- Introduction
- Technical explanation
- Examples
- Conclusion
- Related projects
- Selected article, such as a related or more specialised subject

## Content blocks

All pages, projects, and articles are composed using reusable content blocks. This enables consistent presentation while allowing each piece of content to adopt the structure most appropriate for its purpose.

### Textual blocks

#### Rich text

Presents a single paragraph of written information.

- **Typical usage:** Present written information in its most atomic state, paragraph by paragraph.
- **Content:** May contain bold text, italic text, hyperlinks, and inline code.

#### Heading

Structures written information.

- **Typical usage:** Provide structure and hierarchy among atomic content blocks.

#### Quote

Presents written information authored by someone else.

- **Typical usage:** Highlight meaningful or memorable information.
- **Content:** Quote text and its author.

#### List

Presents an enumeration of written information.

- **Typical usage:** Group multiple related items.
- **Content:** Multiple text items.

#### Label

Categorises the information that follows it.

- **Typical usage:** Provide generic information about the next atomic content blocks.

### Media blocks

#### Image

Presents an image.

- **Typical usage:** Display an image among other atomic blocks, including diagrams of technical concepts or implementations.
- **Content:** Image, optional caption, and alternative text.

#### Embedded video

Presents a video hosted on an external video platform.

- **Typical usage:** Display externally hosted videos among atomic blocks.
- **Content:** Video, cover image, optional caption, and alternative text.

#### File download

Allows visitors to download a file.

- **Typical usage:** Provide access to a downloadable resource.
- **Content:** The file name, presented as a button or link.

#### Gallery

Groups related images or embedded videos.

- **Typical usage:** Present multiple related images or videos.
- **Content:** A collection of images or embedded videos.

#### Icons

Displays a list of icons.

- **Typical usage:** Present technologies, work experience, or similar concise visual information.
- **Content:** A horizontally arranged collection of icons.

### Technical blocks

Technical blocks support technical writing and help explain engineering concepts.

#### Code

Presents source code as part of a technical explanation.

- **Typical usage:** Discuss implementations in articles and project pages.
- **Content:** Source code, programming language, and an optional caption.

#### Table

Displays information in a grid.

- **Typical usage:** Present genuinely tabular relationships, such as the information used to produce a graph. It should not be used solely for visual layout.
- **Content:** Rows of cells and an optional caption.

#### Metric

Displays a numerical figure.

- **Typical usage:** Present numerical information, such as a change in page-load time or first paint.
- **Content:** The figure and an explanation of what it represents.

### Section blocks

Section blocks structure a page.

#### Hero

Introduces the primary subject of a page and establishes its context.

- **Typical usage:** The first section block on a page, project, or article.
- **Content:** Title, introduction, link button, and supporting visual.

#### Text section

Groups content without indexing it.

- **Typical usage:** Group related content that does not need to appear in a table of contents. It supports line-by-line combinations of text and images.
- **Content:** Related content blocks.

#### Text with media

Presents explanatory text alongside supporting visual material.

- **Typical usage:** Explain concepts, showcase screenshots, or describe engineering solutions.
- **Content:** Explanatory text and supporting visual material.

#### Callout

Emphasises information with a degree of caution or urgency.

- **Typical usage:** Warn, alert, qualify, or otherwise draw attention to atomic or grouped content.
- **Content:** Other atomic blocks.

#### Chapter

Presents a collection of related, primarily written information.

- **Typical usage:** Organise indexable content that can be linked directly or included in a table of contents. It is used most often in articles and is not normally the first block on a page.
- **Content:** Atomic content blocks.

### Navigation blocks

Navigation blocks guide visitors to related content.

#### Related articles

Dynamically displays a collection of articles.

- **Typical usage:** Show related reading on article pages.
- **Content:** A collection of articles represented by their hero content.

#### Related projects

Dynamically displays a collection of projects.

- **Typical usage:** Show related work on project pages.
- **Content:** A collection of projects represented by their hero content.

#### Article reference

Directs visitors to an article.

- **Typical usage:** Offer a deeper exploration of the topic currently being discussed.
- **Content:** Article title and link.

#### Table of contents

Displays and links to chapters on the current page, project, or article.

- **Typical usage:** Give visitors shortcuts to chapters, primarily on article pages.
- **Content:** Navigation links to chapters within the current page.

#### Series table of contents

Displays the articles related to the current article through membership of a series.

- **Typical usage:** Show the current article's position in a series and provide access to the other articles.
- **Content:** A linked list of article titles in the series.

#### Series pagination

Provides navigation to the previous and next articles in a series.

- **Typical usage:** Give readers a clear next step at the end of an article while allowing them to return to the previous article.
- **Content:** Titles and links for the previous and next articles.

### Call-to-action blocks

Call-to-action blocks invite visitors to interact with the page and continue their journey.

#### Button

Presents a link as a button.

- **Typical usage:** Link to other internal content from anywhere on a page.

#### Call to action

Invites visitors to interact with the page and continue their journey through the portfolio.

- **Typical usage:** Prompt a next step among section blocks.
- **Content:** Title, short description, and link button.

#### Contact

A specialised call-to-action block that directs visitors to the contact page.

## Global elements

### Header

The header provides consistent access to the primary navigation and reinforces the identity of the portfolio through branding.

**Characteristics**

- Appears on every public page.

**Typical content**

- Site title
- Menu
- Call to action

### Footer

The footer informs visitors about copyright and privacy rules.

**Characteristics**

- Appears on every public page.

**Typical content**

- Copyright notice
- Link to the privacy statement

[Back to content strategy](README.md)
