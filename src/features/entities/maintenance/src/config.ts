import { allBlockTypes } from "@allondeveen-portfolio/blocks-property/all";
import { blocks } from "@allondeveen-portfolio/blocks-property/config";

import type { GlobalConfig } from "payload";

export const maintenance: GlobalConfig = {
  slug: "maintenance",
  admin: {
    group: "Supporting",
  },
  fields: [
    {
      type: "blocks",
      name: "header",
      blocks: [],
      blockReferences: allBlockTypes,
    },
    {
      ...blocks,
      defaultValue: undefined,
      hooks: undefined,
      blockReferences: allBlockTypes,
    },
  ],
};
