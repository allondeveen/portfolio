import type { Block } from "payload";

export const gridItemBlock: Block = {
  slug: "grid-item",
  admin: {
    group: "Layout",
  },
  fields: [
    {
      type: "blocks",
      name: "blocks",
      blocks: [],
      blockReferences: ["heading", "richText", "stack", "menu"],
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
};
