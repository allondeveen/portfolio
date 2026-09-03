import { apSecond, type Either } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";

import { heroHasAtLeastOneRichText } from "./heroHasAtLeastOneRichText";
import { heroHasExactlyOneHeading } from "./heroHasExactlyOneHeading";
import { heroHeadingHasSizeOne } from "./heroHeadingHasSizeOne";
import { minimumHeroValidation } from "./minimumHeroValidation";
import { headingHasHeadingText } from "../heading/headingHasHeadingText";
import { richTextHasText } from "../richText/richTextHasText";

import type { DocumentWithBlocks } from "../atLeastOneBlock";
import type { ValidationError } from "payload";

export function heroValidation(richTextRequired: boolean = true) {
  return (data: Either<ValidationError, DocumentWithBlocks>) => {
    const minimumHeroValidationResult = minimumHeroValidation(data);

    const heroHeadingValidationResult = pipe(
      minimumHeroValidationResult,
      heroHasExactlyOneHeading,
      heroHeadingHasSizeOne,
      headingHasHeadingText,
    );

    const heroRichtTextValidationResult = pipe(
      minimumHeroValidationResult,
      heroHasAtLeastOneRichText(richTextRequired),
      richTextHasText,
    );

    return pipe(heroHeadingValidationResult, apSecond(heroRichtTextValidationResult));
  };
}
