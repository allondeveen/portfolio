import {
  limitRichTextToOneLine,
  singleLineAdminSettings,
  SingleLineFeature,
} from "@allondeveen-portfolio/single-line-lexical";
import { FixedToolbarFeature, ItalicFeature, lexicalEditor } from "@payloadcms/richtext-lexical";

import type { Block } from "payload";

export const headingBlock: Block = {
  slug: "heading",
  admin: {
    group: "Textual",
  },
  fields: [
    {
      type: "number",
      name: "size",
      min: 1,
      max: 6,
      defaultValue: 2,
      required: true,
    },
    {
      type: "richText",
      name: "headingText",
      editor: lexicalEditor({
        admin: {
          ...singleLineAdminSettings,
        },
        features: () => [ItalicFeature(), FixedToolbarFeature(), SingleLineFeature()],
      }),
      validate: limitRichTextToOneLine,
      required: true,
    },
    {
      type: "radio",
      name: "variant",
      options: [
        {
          value: "default",
          label: "Default",
        },
        {
          value: "muted",
          label: "Muted",
        },
        {
          value: "primary",
          label: "Primary",
        },
      ],
      defaultValue: "default",
      required: true,
    },
  ],
};
