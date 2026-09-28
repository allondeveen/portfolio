import {
  limitRichTextToOneLine,
  singleLineAdminSettings,
  SingleLineFeature,
} from "@allondeveen-portfolio/single-line-lexical";
import { allIcons } from "@allondeveen-portfolio/ui/icons/data";
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
    },
    {
      name: "icon",
      type: "select",
      options: [...allIcons, "none"]
        .filter((name) => name !== "logo")
        .map((name) => {
          const value: string = name;
          switch (name) {
            case "github":
              return {
                label: "GitHub",
                value,
              };
            case "linkedin":
              return {
                label: "LinkedIn",
                value,
              };
            default:
              return {
                label: `${value[0].toUpperCase()}${value.replaceAll("-", " ").slice(1)}`,
                value: name,
              };
          }
        }),
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
