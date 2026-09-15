import type { Block, BlockSlug } from "payload";

export const gridItemBlock = (allowedBlocks: readonly BlockSlug[]): Block => ({
  slug: "grid-item",
  admin: {
    group: "Layout",
  },
  fields: [
    {
      type: "blocks",
      name: "blocks",
      blocks: [],
      blockReferences: [...allowedBlocks],
      required: true,
    },
    {
      type: "number",
      name: "size",
      min: 1,
      max: 12,
      defaultValue: 1,
      required: true,
    },
  ],
});
