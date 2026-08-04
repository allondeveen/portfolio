# Content management

This document defines the rules for authentication, editing, publication, revisions, previews, media, and deletion.

## Authentication

Only authenticated users may access the CMS. Authentication is required for every CMS function except reading pages, projects, articles, clients, series, topics, menus, media, forms, redirects, header, footer, shared project and article blocks, not-found content, and site settings.

The CMS has one role: `administrator`. Signing out, a failed sign-in, or an expired session returns the user to the login page.

## Creating and editing content

A left-side menu lists manageable content types and distinguishes singular types from collections.

Non-singular types have a searchable overview from which an editor can open an item. Create and edit screens provide:

- A field showing the current blocks
- Editing, reordering, and deletion for individual blocks
- An action to add a block
- Select controls or dropdowns for managed-content relationships

The CMS indicates unsaved changes and requests confirmation before leaving with unsaved work. Validation errors appear together at the top unless fields depend on one another.

## Publication workflow

Every collection has a publication state. Saving a new item with `Cmd+S` or `Ctrl+S` creates a draft.

Draft actions:

- Save draft
- Publish changes
- Schedule publish, after the first save

Published-content actions:

- Publish changes
- Unpublish

Published content is always public; hiding it requires unpublishing it. The homepage cannot be unpublished. Scheduled publication can be created, rescheduled, or cancelled.

Required fields are validated when saving and before publication. Invalid or incomplete required fields prevent publication. Unpublished referenced content disappears from the website without automatically invalidating the referring content.

## Revision history

Every save creates a revision with a numerical ID and timestamp.

- At most two revisions can be compared at once.
- A revision can be restored; restoration creates a new revision.
- Saving changes to published content creates an unpublished revision.
- Changes become public only when published immediately or through a schedule.

## Preview

Collections with revisions can be previewed.

- A preview link is bound to the latest saved unpublished revision when the link is generated; unsaved and later changes are not shown through that link.
- Previews use the same presentation as published content.
- Referenced unpublished content is included.
- A shared preview link can be viewed once.
- An expired, invalid, or already-used link shows only public content.

## Media library

The CMS accepts images and PDF documents. Videos are embedded from a hosting platform such as YouTube.

- Applicable blocks can reference uploaded media.
- Alternative text is required for images.
- Editors can resize images and change their focal point.
- Assets can be reused.
- Replacing an asset updates all published uses.
- Removing an asset removes it from published content.
- Editors receive a warning, but are not blocked from removing a used asset.
- Media can be searched and filtered.
- Documents are managed in the same way as images.

## Deletion

Every collection item except the homepage can be deleted.

- Deletion is recoverable for 30 days, after which it is permanent.
- References to deleted content are removed from the website.
- Referenced content requires deletion confirmation.
- Published content need not be unpublished before deletion.

[Back to functional design](README.md)
