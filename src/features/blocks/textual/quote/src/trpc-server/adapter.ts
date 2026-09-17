import { mapLexicalText } from "@allondeveen-portfolio/lexical-text/trpc-server";

import type { Quote as CMSQuote } from "../cms/data";
import type { Quote } from "../website/data";
import type { Adapter } from "@allondeveen-portfolio/adapter/trpc-server";

export const mapQuote: Adapter<CMSQuote, Quote> = async (quote, context) => {
  return {
    id: quote.id,
    kind: quote.blockType,
    quote: await mapLexicalText(quote.quote, context),
    author: quote?.author ? await mapLexicalText(quote.author, context) : undefined,
  };
};
