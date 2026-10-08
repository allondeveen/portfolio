import {
  limitRichTextToOneLine,
  singleLineAdminSettings,
  SingleLineFeature,
} from "@allondeveen-portfolio/single-line-lexical";
import { variant } from "@allondeveen-portfolio/variant-property/config";
import {
  BoldFeature,
  FixedToolbarFeature,
  ItalicFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

import type { Block } from "payload";

export const filedownloadBlock: Block = {
  slug: "fileDownload",
  admin: {
    group: "Media",
  },
  fields: [
    {
      type: "select",
      name: "style",
      defaultValue: "link",
      required: true,
      options: [
        {
          label: "Link",
          value: "link",
        },
        {
          label: "Button",
          value: "button",
        },
      ],
    },
    {
      ...variant,
      admin: {
        ...(variant.admin ?? {}),
        condition: (_, siblingData) => siblingData?.style === "button",
      },
    },
    {
      type: "richText",
      name: "label",
      editor: lexicalEditor({
        admin: {
          ...singleLineAdminSettings,
        },
        features: () => [
          BoldFeature(),
          ItalicFeature(),
          FixedToolbarFeature(),
          SingleLineFeature(),
        ],
      }),
      validate: limitRichTextToOneLine,
    },
    {
      name: "download",
      type: "relationship",
      relationTo: "media",
      hasMany: false,
      filterOptions: {
        type: {
          equals: "download",
        },
      },
    },
  ],
};
