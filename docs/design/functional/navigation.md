# Navigation

## Global navigation

The header and footer each contain a single-level menu.

- The header links to the portfolio's primary content.
- The footer links to privacy and copyright statements.
- There is no separate mobile-menu pattern, though items may become vertical.
- The current page is indicated.
- Both menus support keyboard navigation and visible focus.
- External links open in a new tab.
- Empty menus are hidden.

## Hierarchical navigation

Pages can have a parent. Breadcrumbs contain the homepage, every parent page, and the current page. Every crumb except the current page is a link.

## Contextual navigation

Series provide an ordered article overview and previous/next navigation. Topics connect articles and projects; related results must share at least one topic, not necessarily all topics.

Editors can select and embed an article in a page, article, or project using a callout. Referenced data is retrieved during each request, so changes appear on the next request and deleted references disappear.

## URL navigation

- Every public collection item is reachable through its slug.
- Projects, articles, and file downloads use contextual slug segments.
- Changing a slug creates a redirect to the newest location.
- Redirects normally target internal content but may target an external page.
- Chapters are addressable through URL anchors.
- Arbitrary fragment links are unsupported because content can change.

## Agentic navigation

AI search is a primary navigation method.

- The chat page displays a prompt field and conversation history.
- The input remains editable while an answer is generated, but submission is disabled.
- Questions can concern the author and any public portfolio content.
- Answers are grounded in the portfolio and link to specific sources through citations.
- Suggested questions appear in a fresh chat and disappear after the first prompt.
- The agent explicitly says when it cannot answer.
- Errors are communicated to the visitor.
- The chat page has the normal header but no hero, preserving access to traditional navigation.

[Back to functional design](README.md)
