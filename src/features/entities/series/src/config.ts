import { id } from "@allondeveen-portfolio/id-property/config";

import { articles } from "./cms/properties/articles";
import { slug } from "./cms/properties/slug";
import { syncSlugFromTitle } from "./cms/properties/syncSlugFromTitle";
import { title } from "./cms/properties/title";

import type { CollectionConfig } from "payload";

// TODO: add Topics, Series and Clients
export const series: CollectionConfig = {
  slug: "series",
  admin: {
    group: "Taxonomies",
    useAsTitle: "title",
  },
  labels: {
    singular: "Series",
    plural: "Series",
  },
  fields: [id, title, slug, articles, syncSlugFromTitle],
};
