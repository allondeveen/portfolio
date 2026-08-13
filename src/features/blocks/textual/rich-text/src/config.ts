import {
  limitRichTextToOneLine,
  singleLineAdminSettings,
  SingleLineFeature,
} from "@allondeveen-portfolio/single-line-lexical";
import {
  BoldFeature,
  FixedToolbarFeature,
  InlineCodeFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
} from "@payloadcms/richtext-lexical";

import type { Block } from "payload";

export const richTextblock: Block = {
  slug: "richText",
  admin: {
    group: "Textual",
  },
  fields: [
    {
      type: "richText",
      name: "text",
      editor: lexicalEditor({
        admin: {
          ...singleLineAdminSettings,
        },
        features: () => [
          LinkFeature({
            fields: ({ defaultFields }) => [...defaultFields],
          }),
          BoldFeature(),
          ItalicFeature(),
          InlineCodeFeature(),
          FixedToolbarFeature(),
          SingleLineFeature(),
        ],
      }),
      validate: limitRichTextToOneLine,
      required: true,
    },
  ],
};
