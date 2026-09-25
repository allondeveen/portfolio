import {
  limitRichTextToOneLine,
  singleLineAdminSettings,
  SingleLineFeature,
} from "@allondeveen-portfolio/single-line-lexical";
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
      type: "select",
      name: "variant",
      defaultValue: "default",
      required: true,
      options: [
        {
          label: "Default",
          value: "default",
        },
        {
          label: "Primary",
          value: "primary",
        },
        {
          label: "Secondary",
          value: "secondary",
        },
        {
          label: "Disabled",
          value: "disabled",
        },
      ],
      admin: {
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
