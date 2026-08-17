import { mapLexicalText } from "@allondeveen-portfolio/lexical-text/trpc-server";

import type { RichText as CMSRichText } from "../cms/data";
import type { RichText } from "../website/data";
import type { Adapter } from "@allondeveen-portfolio/adapter/trpc-server";

export const mapRichText: Adapter<CMSRichText, RichText> = async (richText, context) => {
  return {
    id: richText.id,
    kind: richText.blockType,
    text: await mapLexicalText(richText.text, context),
  };
};
