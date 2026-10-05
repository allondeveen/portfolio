import { mapLexicalText } from "@allondeveen-portfolio/lexical-text/trpc-server";

import type { Icon as CMSIcon } from "../cms/data";
import type { Icon } from "../website/data";
import type { Adapter } from "@allondeveen-portfolio/adapter/trpc-server";

export const mapIcon: Adapter<CMSIcon, Icon> = async (icon, context) => {
  return {
    id: icon.id,
    kind: icon.blockType,
    variant: icon.variant,
    icon: icon.icon,
    title: icon.title ? await mapLexicalText(icon.title, context) : undefined,
  };
};
