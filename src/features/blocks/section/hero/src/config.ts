import type { Block, BlockSlug } from "payload";

export const heroBlock = (allowedBlocks: readonly BlockSlug[]): Block => ({
  slug: "hero",
  admin: {
    group: "Section",
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
