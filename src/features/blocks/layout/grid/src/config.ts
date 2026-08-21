import type { Block } from "payload";

export const gridBlock: Block = {
  slug: "grid",
  admin: {
    group: "Section",
  },
  fields: [
    {
      type: "blocks",
      name: "blocks",
      blocks: [],
      blockReferences: ["grid-item"],
    },
  ],
};
