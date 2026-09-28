import type { Block, BlockSlug } from "payload";

export const galleryBlock = (allowedBlocks: readonly BlockSlug[]): Block => ({
  slug: "gallery",
  admin: {
    group: "Media",
  },
  fields: [
    {
      type: "select",
      name: "layout",
      required: true,
      defaultValue: "grid",
      options: [
        {
          label: "Grid",
          value: "grid",
        },
        {
          label: "Masonry",
          value: "masonry",
        },
        {
          label: "Carousel",
          value: "carousel",
        },
      ],
    },
    {
      type: "blocks",
      name: "images",
      blocks: [],
      blockReferences: [...allowedBlocks],
    },
  ],
});
