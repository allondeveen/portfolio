import { mapLexicalText } from "@allondeveen-portfolio/lexical-text/trpc-server";

import type { Heading as CMSHeading } from "../cms/data";
import type { Heading } from "../website";

export function mapHeading(heading: CMSHeading): Heading {
  return {
    kind: heading.blockType,
    size: heading.size,
    text: mapLexicalText(heading.headingText),
    variant: heading.variant,
  };
}
