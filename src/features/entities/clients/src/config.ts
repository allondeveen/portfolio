import { id } from "@allondeveen-portfolio/id-property/config";

import { name } from "./cms/properties/name";
import { slug } from "./cms/properties/slug";
import { syncSlugFromName } from "./cms/properties/syncSlugFromName";

import type { CollectionConfig } from "payload";

// TODO: add Topics, Series and Clients
export const clients: CollectionConfig = {
  slug: "clients",
  admin: {
    group: "Taxonomies",
    useAsTitle: "name",
  },
  labels: {
    singular: "Client",
    plural: "Clients",
  },
  fields: [id, name, slug, syncSlugFromName],
};
