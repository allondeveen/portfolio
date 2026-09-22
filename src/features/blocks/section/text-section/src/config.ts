import type { Block, BlockSlug } from "payload";

export const textsectionBlock = (allowedBlocks: readonly BlockSlug[]): Block => ({
  slug: "textSection",
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
