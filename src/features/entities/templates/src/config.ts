import { id } from "@allondeveen-portfolio/id-property/config";

import { blocks } from "./cms/properties/blocks";
import { location } from "./cms/properties/location";

import type { CollectionConfig } from "payload";

export const templates: CollectionConfig = {
  slug: "templates",
  admin: {
    group: "Supporting",
    useAsTitle: "location",
  },
  fields: [id, location, blocks],
};
