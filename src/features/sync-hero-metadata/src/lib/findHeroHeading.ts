import { findHero } from "@allondeveen-portfolio/public-documents/cms";
import { reduceFieldsToValues } from "payload/shared";

import type { FormState } from "payload";

export type FindHeroHeadingOptions = {
  headingBlockType: string;
  heroBlockType: string;
};

export const findHeroHeading = (fields: FormState): string | null => {
  const formValues = reduceFieldsToValues(fields, true);

  const hero = findHero(formValues).at(0);

  if (hero) {
    return hero.blocks.find((block) => block.blockType == "heading")?.headingText as string | null;
  }

  return null;
};
