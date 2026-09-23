import type { Block } from "payload";

export const embeddedvideoBlock: Block = {
  slug: "embeddedVideo",
  admin: {
    group: "Media",
  },
  fields: [
    {
      name: "coverImage",
      type: "relationship",
      relationTo: "media",
      hasMany: false,
      filterOptions: {
        type: {
          equals: "image",
        },
      },
    },
    {
      name: "videoUrl",
      type: "text",
      required: true,
    },
  ],
};
