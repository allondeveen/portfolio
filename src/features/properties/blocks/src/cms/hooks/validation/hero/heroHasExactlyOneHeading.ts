import { type HeadingResult, type HeroSearchResults } from "@allondeveen-portfolio/hero-block/cms";
import { type Either, flatMap, left, right } from "fp-ts/lib/Either";

import { childBlockValidationError } from "../errors";

import type { ValidationError } from "payload";

export function heroHasExactlyOneHeading(result: Either<ValidationError, HeroSearchResults>) {
  return flatMap((data: HeroSearchResults) => {
    const headings = data.blocks.filter((block) => block.blockType === "heading");

    if (headings.length !== 1) {
      return left(
        childBlockValidationError("hero", "Must have exactly 1 heading block.", ["blocks"]),
      );
    }
    return right(headings.at(0) as HeadingResult);
  })(result);
}
