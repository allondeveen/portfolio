import type { Block, BlockSlug } from "payload";

export const buttongroupBlock = (allowedBlocks: readonly BlockSlug[]): Block => ({
  slug: "buttonGroup",
  admin: {
    group: "Group",
  },
  fields: [
    {
      type: "blocks",
      name: "blocks",
      blocks: [],
      blockReferences: [...allowedBlocks],
    },
  ],
});
