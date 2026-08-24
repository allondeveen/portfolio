import type { Block } from "payload";

export const menuBlock: Block = {
  slug: "menu",
  admin: {
    group: "Navigation",
  },
  fields: [
    {
      name: "menu",
      type: "relationship",
      relationTo: "menu",
      hasMany: false,
    },
  ],
  interfaceName: "MenuBlock",
};
