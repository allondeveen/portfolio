import {
  limitRichTextToOneLine,
  singleLineAdminSettings,
  SingleLineFeature,
} from "@allondeveen-portfolio/single-line-lexical";
import { AllowedTextStateFeature } from "@allondeveen-portfolio/text-state-lexical";
import {
  BoldFeature,
  FixedToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
} from "@payloadcms/richtext-lexical";

import type { Block } from "payload";

export const quoteblock: Block = {
  slug: "quote",
  admin: {
    group: "Textual",
  },
  fields: [
    {
      type: "richText",
      name: "quote",
      editor: lexicalEditor({
        admin: {
          ...singleLineAdminSettings,
        },
        features: () => [
          AllowedTextStateFeature(() => ["highlight"]),
          FixedToolbarFeature(),
          SingleLineFeature(),
        ],
      }),
      validate: limitRichTextToOneLine,
      required: true,
    },
    {
      type: "richText",
      name: "author",
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
          FixedToolbarFeature(),
          SingleLineFeature(),
        ],
      }),
      validate: limitRichTextToOneLine,
    },
  ],
};
