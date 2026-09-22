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

export const labelBlock: Block = {
  slug: "label",
  admin: {
    group: "Textual",
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
      type: "richText",
      name: "text",
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
