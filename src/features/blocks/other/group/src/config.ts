import type { Block, BlockSlug } from "payload";

export const groupBlock = (allowedBlocks: readonly BlockSlug[]): Block => ({
  slug: "group",
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
