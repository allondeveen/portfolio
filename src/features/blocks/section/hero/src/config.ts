import type { Block, BlockSlug } from "payload";

export const heroBlock = (allowedBlocks: readonly BlockSlug[]): Block => ({
  slug: "hero",
  admin: {
    group: "Section",
  },
  fields: [
    {
      type: "select",
      name: "variant",
      options: [
        {
          label: "Default",
          value: "default",
        },
        {
          label: "Elevated",
          value: "elevated",
        },
        {
          label: "Overlay",
          value: "overlay",
        },
      ],
      defaultValue: "default",
    },
    {
      type: "blocks",
      name: "blocks",
      blocks: [],
      blockReferences: [...allowedBlocks],
    },
  ],
});
