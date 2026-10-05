import type { Block, BlockSlug } from "payload";

export const iconsBlock = (allowedBlocks: readonly BlockSlug[]): Block => ({
  slug: "icons",
  admin: {
    group: "Media",
  },
  labels: {
    plural: "Icons",
    singular: "Icons",
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
