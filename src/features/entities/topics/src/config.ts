import { id } from "@allondeveen-portfolio/id-property/config";

import { name } from "./cms/properties/name";
import { parent } from "./cms/properties/parent";
import { slug } from "./cms/properties/slug";
import { syncSlugFromName } from "./cms/properties/syncSlugFromName";

import type { CollectionConfig } from "payload";

// TODO: add Topics, Series and Clients
export const topics: CollectionConfig = {
  slug: "topics",
  admin: {
    group: "Taxonomies",
    useAsTitle: "name",
  },
  labels: {
    singular: "Topic",
    plural: "Topics",
  },
  versions: {
    drafts: {
      schedulePublish: true,
      validate: true,
    },
  },
  fields: [id, name, slug, parent, syncSlugFromName],
};
