import type { Block, BlockSlug } from "payload";

export const gridBlock = (allowedBlocks: readonly BlockSlug[]): Block => ({
  slug: "grid",
  admin: {
    group: "Layout",
  },
  fields: [
    {
      type: "checkbox",
      name: "verticalAlign",
      defaultValue: false,
    },
    {
      type: "blocks",
      name: "blocks",
      blocks: [],
      blockReferences: [...allowedBlocks],
    },
  ],
});
