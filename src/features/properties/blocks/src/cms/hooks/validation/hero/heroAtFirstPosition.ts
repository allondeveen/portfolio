import { type HeroSearchResults } from "@allondeveen-portfolio/hero-block/cms";
import { type Either, flatMap, left, right } from "fp-ts/lib/Either";

import { childBlockValidationError } from "../errors";

import type { ValidationError } from "payload";

export function heroAtFirstPosition(result: Either<ValidationError, HeroSearchResults>) {
  return flatMap((data: HeroSearchResults) => {
    if (data.position !== 0) {
      return left(childBlockValidationError("hero", "Hero must be the first block", ["blocks"]));
    }
    return right(data);
  })(result);
}
