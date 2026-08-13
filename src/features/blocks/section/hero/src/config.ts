import type { Block } from "payload";

export const heroBlock: Block = {
  slug: "hero",
  admin: {
    group: "Section",
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
