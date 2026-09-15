import type { Block, BlockSlug } from "payload";

export const containerBlock = (allowedBlocks: readonly BlockSlug[]): Block => ({
  slug: "container",
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
