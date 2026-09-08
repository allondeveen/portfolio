import { allBlockTypes } from "@allondeveen-portfolio/blocks-property/all";
import { blocks } from "@allondeveen-portfolio/blocks-property/config";
import { id } from "@allondeveen-portfolio/id-property/config";

import { invalidateCache } from "./cms/hooks/invalidateCache";
import { validateBlocks } from "./cms/hooks/validateBlocks";
import { location } from "./cms/properties/location";

import type { CollectionConfig } from "payload";

export const templates: CollectionConfig = {
  slug: "templates",
  admin: {
    group: "Supporting",
    useAsTitle: "location",
  },
  fields: [
    id,
    location,
    {
      ...blocks,
      defaultValue: undefined,
      blockReferences: allBlockTypes,
      hooks: {
        beforeValidate: [validateBlocks],
      },
    },
  ],
  hooks: {
    afterChange: [invalidateCache],
  },
};
