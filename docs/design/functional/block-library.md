# Block library

Blocks are reusable components for pages, projects, articles, and shared regions such as the header and footer. Each block has one responsibility and can be combined into larger structures.

## Layout blocks

### Grid

Arranges child blocks horizontally in a twelve-column layout.

| Configuration | Description                              | Required |
| ------------- | ---------------------------------------- | -------- |
| Blocks        | Child blocks                             | Yes      |
| Child size    | Number of columns occupied by each child | No       |

- Children appear left to right in configured order and adapt to smaller viewports without changing content order.
- At least one child is required.
- Each configured span is between 1 and 12.

### Stack

Arranges child blocks vertically, particularly inside a grid.

| Configuration | Description  | Required |
| ------------- | ------------ | -------- |
| Blocks        | Child blocks | Yes      |

Children appear one below another. At least one child is required.

### Container

Centres a group of child blocks.

| Configuration | Description  | Required |
| ------------- | ------------ | -------- |
| Blocks        | Child blocks | Yes      |

At least one child is required.

### Group

Groups child blocks without opinionation.

| Configuration | Description  | Required |
| ------------- | ------------ | -------- |
| Blocks        | Child blocks | Yes      |

At least one child is required.

## Textual blocks

### Rich text

Renders one paragraph containing text, links, bold and italic formatting, inline code, and colours.

| Configuration | Description         | Required |
| ------------- | ------------------- | -------- |
| Text          | Formatted paragraph | Yes      |

- Configured inline formatting is preserved.
- Links are navigable and require a valid destination.
- Inline code is visually distinct.
- Only supported inline formatting is accepted.

### Heading

| Configuration | Description                    | Required |
| ------------- | ------------------------------ | -------- |
| Text          | Heading text                   | Yes      |
| Size          | Heading level from 1 through 6 | No       |
| Variant       | Colour variant                 | No       |

Level 1 is permitted only once per page and only in the hero.

### Quote

| Configuration | Description | Required |
| ------------- | ----------- | -------- |
| Text          | Quote text  | Yes      |
| Author        | Author name | No       |

The quote is visually prominent and its author appears below it. An author is required when the quote is not authored by the portfolio owner.

### List

| Configuration     | Description              | Required |
| ----------------- | ------------------------ | -------- |
| Blocks            | List items               | Yes      |
| Type              | Ordered or unordered     | No       |
| Enumeration marks | Marks shown before items | No       |

Items render in configured order. Empty marks result in no visible marks.

### Label

| Configuration | Description | Required |
| ------------- | ----------- | -------- |
| Text          | Label text  | Yes      |

The label is visually distinct from both headings and quotes.

## Media blocks

### Image

| Configuration    | Description                          | Required |
| ---------------- | ------------------------------------ | -------- |
| Source           | Selected image                       | Yes      |
| Alternative text | Text used when the image cannot load | Yes      |

### Embedded video

| Configuration | Description                        | Required |
| ------------- | ---------------------------------- | -------- |
| Source        | URL of the externally hosted video | Yes      |
| Cover image   | Image displayed before playback    | No       |

### File download

| Configuration | Description                 | Required |
| ------------- | --------------------------- | -------- |
| Source        | File offered to the visitor | Yes      |

Renders a link that downloads the selected file.

### Gallery

| Configuration | Description                | Required |
| ------------- | -------------------------- | -------- |
| Layout        | Grid, carousel, or masonry | Yes      |
| Blocks        | Image blocks               | Yes      |

- Grid displays images in a grid.
- Carousel places images beside one another and centres the current image. Reading and keyboard order remain consistent with content order.
- Masonry uses a grid that respects image dimensions.

### Icon

| Configuration | Description                               | Required |
| ------------- | ----------------------------------------- | -------- |
| Source        | URL or instance from an icon-font library | Yes      |

Displays a single brand, technology, or custom icon.

### Icons

| Configuration | Description | Required |
| ------------- | ----------- | -------- |
| Blocks        | Icon blocks | Yes      |

Displays icons horizontally.

## Technical blocks

### Code

| Configuration | Description          | Required |
| ------------- | -------------------- | -------- |
| Language      | Programming language | Yes      |
| Code          | Source code          | Yes      |

- Displays the language and numbered lines.
- Long lines wrap without gaining additional line numbers.
- Syntax highlighting follows the configured language; unsupported languages use plain text.
- A copy action copies code without line numbers and temporarily confirms success.
- HTML is escaped and shown as source rather than rendered.

### Table

| Configuration | Description              | Required |
| ------------- | ------------------------ | -------- |
| Header row    | Column headings          | No       |
| Rows          | Content rows             | Yes      |
| Caption       | Explanation of the table | No       |

Each row contains required rich-text cells. The optional header and caption are shown when present.

### Metric

| Configuration | Description     | Required |
| ------------- | --------------- | -------- |
| Unit          | Unit of measure | No       |
| Value         | Numerical value | Yes      |

The unit, when present, appears on the same line as the value.

## Section blocks

### Hero

| Configuration | Description       | Required |
| ------------- | ----------------- | -------- |
| Page title    | Heading block     | Yes      |
| Introduction  | Text block        | Yes      |
| Action        | Button block      | No       |
| Visual        | Media block       | No       |
| Extra content | Additional blocks | No       |

The title uses the page's only level-1 heading. The visual, title, introduction, optional action, and optional extra content are rendered.

### Text section

| Configuration | Description    | Required |
| ------------- | -------------- | -------- |
| Blocks        | Wrapped blocks | Yes      |

Renders its children without additional presentation and is not indexed by the table of contents.

### Text with media

| Configuration | Description          | Required |
| ------------- | -------------------- | -------- |
| Media         | Media block          | Yes      |
| Blocks        | Other wrapped blocks | Yes      |

Renders the media and remaining blocks without adding opinions to their presentation. It is not indexed by the table of contents.

### Callout

| Configuration | Description                             | Required |
| ------------- | --------------------------------------- | -------- |
| Urgency       | `note`, `warning`, `danger`, or `error` | Yes      |
| Blocks        | Callout content                         | Yes      |

Urgency changes the colour scheme used to present the children.

### Chapter

| Configuration | Description                | Required |
| ------------- | -------------------------- | -------- |
| Title         | Navigational chapter title | Yes      |
| Blocks        | Chapter content            | Yes      |

The table-of-contents block displays the title. The chapter renders its children without additional presentation.

## Navigation blocks

### Selected articles

| Configuration   | Description              | Required |
| --------------- | ------------------------ | -------- |
| Topics          | Article topics to match  | Yes      |
| Layout          | Grid or list             | Yes      |
| Per-page amount | Items per page           | Yes      |
| Maximum amount  | Maximum across all pages | Yes      |
| Template        | Article presentation     | Yes      |

The template can use the article title, hero visual, derived summary, topics, link, button, query topics, and nested blocks. Pagination appears when the maximum exceeds the per-page amount. Referenced data is refreshed with the source, at least on reload.

### Selected projects

| Configuration   | Description              | Required |
| --------------- | ------------------------ | -------- |
| Topics          | Project topics to match  | Yes      |
| Layout          | Grid or list             | Yes      |
| Per-page amount | Items per page           | Yes      |
| Maximum amount  | Maximum across all pages | Yes      |
| Template        | Project presentation     | Yes      |

The template can use the project title, hero visual, derived summary, topics, link, button, query topics, and nested blocks. Pagination and live referenced data behave as for related articles.

### Related articles

| Configuration   | Description              | Required |
| --------------- | ------------------------ | -------- |
| Topics          | Article topics to match  | Yes      |
| Layout          | Grid or list             | Yes      |
| Per-page amount | Items per page           | Yes      |
| Maximum amount  | Maximum across all pages | Yes      |
| Template        | Article presentation     | Yes      |

The template can use the article title, hero visual, derived summary, topics, link, button, query topics, and nested blocks. Pagination appears when the maximum exceeds the per-page amount. Referenced data is refreshed with the source, at least on reload.

### Related projects

| Configuration   | Description              | Required |
| --------------- | ------------------------ | -------- |
| Topics          | Project topics to match  | Yes      |
| Layout          | Grid or list             | Yes      |
| Per-page amount | Items per page           | Yes      |
| Maximum amount  | Maximum across all pages | Yes      |
| Template        | Project presentation     | Yes      |

The template can use the project title, hero visual, derived summary, topics, link, button, query topics, and nested blocks. Pagination and live referenced data behave as for related articles.

### Article reference

| Configuration | Description            | Required |
| ------------- | ---------------------- | -------- |
| Article       | Referenced article     | Yes      |
| Template      | Reference presentation | Yes      |

The template can use the article title, derived summary, link, and button. Referenced data tracks its source and can be placed in blocks.

### Table of contents

| Configuration    | Description                                 | Required |
| ---------------- | ------------------------------------------- | -------- |
| Subchapter depth | Number of nested chapter levels to discover | Yes      |

Renders linked chapter and subchapter titles for the current page.

### Series table of contents

| Configuration | Description         | Required |
| ------------- | ------------------- | -------- |
| Template      | Series presentation | Yes      |

The template can use the full table of contents and series title. It lists and links all articles in the current article's series and uses live referenced data.

### Series pagination

| Configuration | Description              | Required |
| ------------- | ------------------------ | -------- |
| Type          | Previous or next article | Yes      |
| Template      | Pagination presentation  | Yes      |

The template can use the adjacent article's title and location. It links to the corresponding article and uses live referenced data.

### Menu

| Configuration | Description     | Required |
| ------------- | --------------- | -------- |
| Menu          | Menu to display | Yes      |

Renders a simple, single-level menu.

### Site title

Displays the site title and can supply that value to other blocks.

## Call-to-action blocks

### Button

| Configuration | Description    | Required |
| ------------- | -------------- | -------- |
| Label         | Button label   | Yes      |
| Link          | Destination    | Yes      |
| Layout        | Link or button | Yes      |
| Variant       | Colour variant | Yes      |

Renders an anchor using the selected presentation.

### Button group

| Configuration | Description           | Required |
| ------------- | --------------------- | -------- |
| Blocks        | Buttons in the group  | Yes      |
| Variant       | Shared colour variant | No       |

When supplied, the group variant overrides each button's own variant.

### Call to action

| Configuration          | Description          | Required |
| ---------------------- | -------------------- | -------- |
| Title                  | Call-to-action title | Yes      |
| Introduction           | Supporting text      | Yes      |
| Button or button group | Available actions    | Yes      |

### Contact

| Configuration | Description          | Required |
| ------------- | -------------------- | -------- |
| Title         | Call-to-action title | Yes      |
| Introduction  | Supporting text      | Yes      |

Behaves as a call to action whose button always links to the contact page.

## User-input blocks

### Form

| Configuration | Description                    | Required |
| ------------- | ------------------------------ | -------- |
| Form          | Form from the Forms collection | Yes      |

Renders every configured field and a submit button.

[Back to functional design](README.md)
