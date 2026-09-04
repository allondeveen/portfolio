import { blocks } from "@allondeveen-portfolio/blocks-property/config";
import { id } from "@allondeveen-portfolio/id-property/config";
import { slug, syncSlugFromHero } from "@allondeveen-portfolio/slug-property/config";
import { syncTitleFromHero, title } from "@allondeveen-portfolio/title-property/config";

import type { CollectionConfig } from "payload";

// TODO: add Topics, Series and Clients
export const articles: CollectionConfig = {
  slug: "articles",
  admin: {
    group: "Collection",
    useAsTitle: "title",
  },
  labels: {
    singular: "Article",
    plural: "Articles",
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
          fields: [slug("articles", "/articles")],
        },
      ],
    },
    title,
    blocks,
    syncSlugFromHero,
    syncTitleFromHero,
  ],
};
