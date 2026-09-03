import { apSecond, type Either } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";

import { heroHasAtLeastOneRichText } from "./heroHasAtLeastOneRichText";
import { heroHasExactlyOneHeading } from "./heroHasExactlyOneHeading";
import { heroHeadingHasSizeOne } from "./heroHeadingHasSizeOne";
import { minimumHeroValidation } from "./minimumHeroValidation";
import { baseHeadingHasHeadingText } from "../heading/headingHasHeadingText";
import { baseRichTextHasText } from "../richText/richTextHasText";

import type { DocumentWithBlocks } from "../atLeastOneBlock";
import type { ValidationError } from "payload";

export function heroValidation(richTextRequired: boolean = true) {
  return (data: Either<ValidationError, DocumentWithBlocks>) => {
    const minimumHeroValidationResult = minimumHeroValidation(data);

    const heroHeadingValidationResult = pipe(
      minimumHeroValidationResult,
      heroHasExactlyOneHeading,
      heroHeadingHasSizeOne,
      baseHeadingHasHeadingText(["blocks", "hero"]),
    );

    const heroRichtTextValidationResult = pipe(
      minimumHeroValidationResult,
      heroHasAtLeastOneRichText(richTextRequired),
      baseRichTextHasText(["blocks", "hero"]),
    );

    return pipe(heroHeadingValidationResult, apSecond(heroRichtTextValidationResult));
  };
}
