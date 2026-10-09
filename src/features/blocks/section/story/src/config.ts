import type { Block, BlockSlug } from "payload";

export const storyBlock = (allowedBlocks: readonly BlockSlug[]): Block => ({
  slug: "story",
  admin: {
    group: "Section",
  },
  fields: [
    {
      type: "select",
      name: "columnDistribution",
      options: [
        {
          label: "1|1",
          value: "1/1",
        },
        {
          label: "1|2",
          value: "1/2",
        },
        {
          label: "1|3",
          value: "1/3",
        },
      ],
      defaultValue: "1/1",
    },
    {
      type: "select",
      name: "mobileColumnDistribution",
      options: [
        {
          label: "1|1",
          value: "1/1",
        },
        {
          label: "1|2",
          value: "1/2",
        },
        {
          label: "1|3",
          value: "1/3",
        },
      ],
      defaultValue: "1/1",
    },
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
