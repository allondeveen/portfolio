import { blocks } from "@allondeveen-portfolio/blocks-property/config";
import { id } from "@allondeveen-portfolio/id-property/config";
import { slug, syncSlugFromHero } from "@allondeveen-portfolio/slug-property/config";
import { syncTitleFromHero, title } from "@allondeveen-portfolio/title-property/config";

import { clients } from "./cms/properties/clients";
import { technologies } from "./cms/properties/technologies";

import type { CollectionConfig } from "payload";

// TODO: add Topics and Clients
export const projects: CollectionConfig = {
  slug: "projects",
  admin: {
    group: "Collection",
    useAsTitle: "title",
  },
  labels: {
    singular: "Project",
    plural: "Projects",
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
          fields: [slug("projects", "/projects")],
        },
        technologies,
        clients,
      ],
    },
    title,
    blocks,
    syncSlugFromHero,
    syncTitleFromHero,
  ],
};
