import { mapLexicalText } from "@allondeveen-portfolio/lexical-text/trpc-server";

import type { Icons as CMSIcons } from "../cms";
import type { Icons } from "../website/data";
import type { Adapter } from "@allondeveen-portfolio/adapter/trpc-server";

export const mapIcons: Adapter<CMSIcons, Icons> = async (icons, context) => {
  return {
    id: icons.id,
    kind: icons.blockType,
    tooltips: await Promise.all(
      icons.blocks.map(async (icon) => {
        return {
          id: icon.id,
          text: icon.title ? await mapLexicalText(icon.title, context) : undefined,
          variant: icon.variant,
        };
      }),
    ),
  };
};
