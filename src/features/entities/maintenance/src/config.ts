import { allBlockTypes } from "@allondeveen-portfolio/blocks-property/all";
import { blocks } from "@allondeveen-portfolio/blocks-property/config";

import { triggerMaintenanceBuild } from "./cms/hooks/triggerMaintenanceBuild";
import { validateBlocks } from "./cms/hooks/validateBlocks";

import type { GlobalConfig } from "payload";

export const maintenance: GlobalConfig = {
  slug: "maintenance",
  admin: {
    group: "Fixed template",
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
      blockReferences: allBlockTypes,
      hooks: {
        beforeValidate: [validateBlocks],
      },
    },
  ],
  hooks: {
    afterChange: [triggerMaintenanceBuild],
  },
};
