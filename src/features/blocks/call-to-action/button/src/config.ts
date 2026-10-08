import {
  limitRichTextToOneLine,
  singleLineAdminSettings,
  SingleLineFeature,
} from "@allondeveen-portfolio/single-line-lexical";
import { allIcons, mapIconsToOptions } from "@allondeveen-portfolio/ui/icons/data";
import { variant } from "@allondeveen-portfolio/variant-property/config";
import {
  BoldFeature,
  FixedToolbarFeature,
  ItalicFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

import type { Block } from "payload";

export const buttonBlock: Block = {
  slug: "button",
  admin: {
    group: "Call to action",
  },
  fields: [
    variant,
    {
      name: "icon",
      type: "select",
      options: [
        ...mapIconsToOptions(allIcons.filter((name) => name !== "logo")),
        {
          label: "None",
          value: "none",
        },
      ],
      defaultValue: "none",
      required: true,
    },
    {
      type: "group",
      name: "location",
      fields: [
        {
          type: "select",
          name: "externality",
          options: [
            {
              label: "Internal",
              value: "internal",
            },
            {
              label: "External",
              value: "external",
            },
          ],
          defaultValue: "internal",
          required: true,
        },
        {
          type: "relationship",
          name: "internal",
          relationTo: ["pages", "projects", "articles"],
          hasMany: false,
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData?.externality === "internal",
          },
        },
        {
          type: "text",
          name: "external",
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData?.externality === "external",
          },
        },
      ],
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
      required: true,
    },
  ],
};
