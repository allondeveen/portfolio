import type { Block, BlockSlug } from "payload";

export const storyBlock = (allowedBlocks: readonly BlockSlug[]): Block => ({
  slug: "story",
  admin: {
    group: "Section",
  },
  fields: [
    {
      type: "array",
      name: "items",
      fields: [
        {
          type: "blocks",
          name: "content",
          blocks: [],
          blockReferences: [...allowedBlocks],
          required: true,
        },
        {
          type: "blocks",
          name: "frame",
          blocks: [],
          blockReferences: [...allowedBlocks],
          required: true,
        },
      ],
      required: true,
    },
  ],
});
