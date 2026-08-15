import { mapLexicalText } from "@allondeveen-portfolio/lexical-text/trpc-server";

import type { RichText as CMSRichText } from "../cms/data";
import type { RichText } from "../website";

export function mapRichText(richText: CMSRichText): RichText {
  return {
    kind: richText.blockType,
    text: mapLexicalText(richText.text),
  };
}
