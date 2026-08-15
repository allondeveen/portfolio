import { validateBlocks } from "./cms/hooks/validateBlocks";

import type { BlocksField } from "payload";

export const blocks: BlocksField = {
  name: "blocks",
  type: "blocks",
  blockReferences: ["hero"],
  blocks: [],
  defaultValue: [
    {
      blockType: "hero",
      blocks: [
        {
          blockType: "heading",
          size: 1,
        },
        {
          blockType: "richText",
        },
      ],
    },
  ],
  hooks: {
    beforeValidate: [validateBlocks],
  },
};
