import { mapLexicalText } from "@allondeveen-portfolio/lexical-text/trpc-server";

import type { Label as CMSlabel } from "../cms/data";
import type { Label } from "../website/data";
import type { Adapter } from "@allondeveen-portfolio/adapter/trpc-server";

export const mapLabel: Adapter<CMSlabel, Label> = async (label, context) => {
  return {
    id: label.id,
    kind: label.blockType,
    variant: label.variant,
    text: await mapLexicalText(label.text, context),
  };
};
