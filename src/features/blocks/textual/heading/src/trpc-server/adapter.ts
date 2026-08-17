import { mapLexicalText } from "@allondeveen-portfolio/lexical-text/trpc-server";

import type { Heading as CMSHeading } from "../cms/data";
import type { Heading } from "../website/data";
import type { Adapter } from "@allondeveen-portfolio/adapter/trpc-server";

export const mapHeading: Adapter<CMSHeading, Heading> = async (heading, context) => {
  return {
    id: heading.id,
    kind: heading.blockType,
    size: heading.size,
    text: await mapLexicalText(heading.headingText, context),
    variant: heading.variant,
  };
};
