import type { Block, BlockSlug } from "payload";

export const stackBlock = (allowedBlocks: readonly BlockSlug[]): Block => ({
  slug: "stack",
  admin: {
    group: "Layout",
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
