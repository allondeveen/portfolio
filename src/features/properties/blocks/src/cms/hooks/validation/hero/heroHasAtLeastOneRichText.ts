import { type HeroSearchResults, type RichTextResult } from "@allondeveen-portfolio/hero-block/cms";
import { type Either, flatMap, left, right } from "fp-ts/lib/Either";

import { childBlockValidationError } from "../errors";

import type { ValidationError } from "payload";

export function heroHasAtLeastOneRichText(required: boolean = true) {
  return (result: Either<ValidationError, HeroSearchResults>) =>
    flatMap((data: HeroSearchResults) => {
      const richText = data.blocks.find(
        (block): block is RichTextResult => block.blockType === "richText",
      );

      if (!richText && required) {
        return left(
          childBlockValidationError("hero", "Must have at least 1 richText block.", ["blocks"]),
        );
      }
      return right(richText);
    })(result);
}
