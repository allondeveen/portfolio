import { blocks } from "@allondeveen-portfolio/blocks-property/config";
import { id } from "@allondeveen-portfolio/id-property/config";
import { slug } from "@allondeveen-portfolio/slug-property/config";
import { title } from "@allondeveen-portfolio/title-property/config";

import { preventHomepageDelete } from "./hooks/preventHomepageDelete";
import { parent } from "./properties/parent";
import { syncSlugFromHero } from "./properties/syncSlugFromHero";
import { syncTitleFromHero } from "./properties/syncTitleFromHero";

import type { CollectionConfig } from "payload";

export const pages: CollectionConfig = {
  slug: "pages",
  admin: {
    group: "Collection",
    useAsTitle: "title",
  },
  labels: {
    singular: "page",
  },
  versions: {
    drafts: {
      schedulePublish: true,
      validate: true,
    },
  },
  fields: [
    id,
    {
      type: "group",
      admin: {
        position: "sidebar",
      },
      fields: [
        {
          type: "row",
          fields: [parent, slug("pages", "/")],
        },
      ],
    },
    title,
    blocks,
    syncSlugFromHero,
    syncTitleFromHero,
  ],
  hooks: {
    beforeDelete: [preventHomepageDelete],
  },
};
