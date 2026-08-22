import type { Block } from "payload";

export const stackBlock: Block = {
  slug: "stack",
  admin: {
    group: "Layout",
  },
  fields: [
    {
      type: "blocks",
      name: "blocks",
      blocks: [],
      blockReferences: ["heading", "richText"],
    },
  ],
};
