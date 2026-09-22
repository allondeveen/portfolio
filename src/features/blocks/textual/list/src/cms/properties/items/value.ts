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

import type { Field } from "payload";

export const value: Field = {
  type: "richText",
  name: "value",
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
};
