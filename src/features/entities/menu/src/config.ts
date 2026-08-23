import { id } from "@allondeveen-portfolio/id-property/config";

import { items } from "./cms/properties/items";
import { location } from "./cms/properties/location";

import type { CollectionConfig } from "payload";

export const menu: CollectionConfig = {
  slug: "menu",
  admin: {
    group: "Supporting",
    useAsTitle: "location",
  },
  fields: [
    // prevent collapse
    id,
    location,
    items,
  ],
};
