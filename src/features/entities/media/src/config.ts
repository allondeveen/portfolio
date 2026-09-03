import { id } from "@allondeveen-portfolio/id-property/config";

import { preventUsedMediaDelete } from "./cms/hooks/preventUsedMediaDelete";

import type { CollectionConfig } from "payload";

export const media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  admin: {
    group: "Supporting",
    useAsTitle: "name",
  },
  fields: [
    id,
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "alt",
      type: "text",
      required: true,
    },
    {
      name: "type",
      type: "radio",
      required: true,
      defaultValue: "image",
      options: [
        {
          label: "Image",
          value: "image",
        },
        {
          label: "Download",
          value: "download",
        },
      ],
    },
    {
      name: "prefix",
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "caption",
      type: "text",
    },
    {
      name: "credits",
      type: "text",
    },
  ],
  hooks: {
    beforeOperation: [
      ({ args, operation, req }) => {
        if ((operation === "create" || operation === "update") && req.file) {
          args.data.prefix = args.data.type === "download" ? "downloads" : "images";

          return args;
        }
      },
    ],
    beforeDelete: [preventUsedMediaDelete],
  },
  upload: {
    // These (crop and focalPoint) are not supported on Workers yet due to lack of sharp
    crop: false,
    focalPoint: false,
    mimeTypes: ["image/*", "application/pdf"],
  },
};
