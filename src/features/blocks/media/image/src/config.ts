import type { Block } from "payload";

export const imageBlock: Block = {
  slug: "image",
  admin: {
    group: "Media",
  },
  fields: [
    {
      name: "image",
      type: "relationship",
      relationTo: "media",
      hasMany: false,
      filterOptions: {
        type: {
          equals: "image",
        },
      },
    },
  ],
};
