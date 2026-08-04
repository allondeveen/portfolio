# Public website

## Global behaviour

Every page contains a header, page-specific main content, and footer. The hero supplies the page title and introduction. The system converts the introduction to a plain-text summary for content previews and as the default SEO description. A custom SEO description overrides the summary for SEO only. Other metadata is configured per page, and articles receive appropriate structured data.

Draft or missing content produces the not-found page. An unhandled delivery-pipeline error produces the error page. Loading states should be prevented.

Every page has a hero. Content-type-specific shared regions are:

- Project post-content: projects-overview call to action and contact block
- Article pre-content: page and series tables of contents
- Article post-content: articles-overview call to action and contact block

## Homepage

The homepage introduces the portfolio and directs visitors to projects, articles, or contact.

**Content**

- Manually configured hero: illustration, technology icons, title, job-title introduction, and contact action
- Featured projects derived from a selected topic, with a manually configured projects-overview action
- Featured articles derived from a selected topic, with a manually configured articles-overview action
- Manually configured work experience
- Manually configured contact block

A featured block is omitted when its filter returns no content.

## Standard page

A standard page serves a purpose outside the projects and articles domains and can have child pages.

- Its manually configured hero contains a visual, title, introduction, and contact action.
- Breadcrumbs contain the homepage, every parent, and the current page.
- It has no post-content blocks.

## Projects overview

The overview displays all published projects by publication date.

- Visitors filter by technology.
- Results are paginated at 15 per page.
- An empty state explains when no projects exist or match.
- Each result shows the title, derived summary, and image from its hero, plus its technologies.

## Project detail

- Displays editor-authored content and a hero containing the technologies.
- The client is mentioned in authored content rather than displayed automatically.
- Shared post-content contains related projects, the overview action, and contact.
- Related projects match at least one current technology, exclude the current project, and use the overview presentation.
- Without matches, only the overview action remains.

## Articles overview

The overview displays all published articles by publication date.

- Visitors filter by topic.
- Results are paginated at 15 per page.
- An empty state explains when no articles match.
- Each result shows the title, derived summary, and image from its hero, plus its topics.

## Article detail

- Displays editor-authored content and a hero containing the topics.
- Pre-content contains the page table of contents and, when applicable, a series table of contents.
- A series table lists all articles in order, marks the current item, and links the other items.
- Post-content contains related articles, the overview action, contact, and series pagination.
- Related articles match at least one current topic, exclude the current article, and use the overview presentation.
- Series pagination links to the previous and next articles where applicable.

## Contact page

The page starts with a hero inviting collaboration, followed by the contact form. Field errors appear beside their fields; form-wide errors appear above the form. Contact information such as email and telephone number appears alongside it.

## System pages

### Not found

CMS-managed content explains that the requested resource cannot be found and links to the homepage.

### Error

CMS-managed content informs visitors when an unresolved error occurs.

### Agentic search

AI search replaces a classical search results page. Visitors ask questions through a chat interface, and an AI model answers using portfolio content.

[Back to functional design](README.md)
