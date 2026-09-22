import { validateBlocks } from "./cms/hooks/validateBlocks";

import type { BlocksField } from "payload";

export const blocks: BlocksField = {
  name: "blocks",
  type: "blocks",
  blockReferences: ["hero", "textSection"],
  blocks: [],
  defaultValue: [
    {
      blockType: "hero",
      variant: "default",
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
  required: true,
  hooks: {
    beforeValidate: [validateBlocks],
  },
};
