import type { Block } from "payload";

export const gridBlock: Block = {
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
      blockReferences: ["grid-item"],
    },
  ],
};
