import { allBlockTypes } from "@allondeveen-portfolio/blocks-property/all";
import { blocks } from "@allondeveen-portfolio/blocks-property/config";

import { triggerMaintenanceBuild } from "./cms/hooks/triggerMaintenanceBuild";

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
      hooks: undefined,
      blockReferences: allBlockTypes,
    },
  ],
  hooks: {
    afterChange: [triggerMaintenanceBuild],
  },
};
