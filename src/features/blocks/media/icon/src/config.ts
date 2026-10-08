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

export const iconBlock: Block = {
  slug: "icon",
  admin: {
    group: "Media",
  },
  fields: [
    variant,
    {
      name: "icon",
      type: "select",
      options: mapIconsToOptions(allIcons.filter((name) => name !== "logo")),
      required: true,
    },
    {
      type: "richText",
      name: "title",
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
  ],
};
