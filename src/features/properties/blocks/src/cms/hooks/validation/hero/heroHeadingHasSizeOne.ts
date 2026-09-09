import { type HeadingResult } from "@allondeveen-portfolio/hero-block/cms";
import { type Either, flatMap, left, right } from "fp-ts/lib/Either";

import { childBlockValidationError } from "../errors";

import type { ValidationError } from "payload";

export function heroHeadingHasSizeOne(result: Either<ValidationError, HeadingResult>) {
  return flatMap((data: HeadingResult) => {
    if (data.size !== 1) {
      return left(childBlockValidationError("heading", "Must have size 1.", ["blocks", "hero"]));
    }
    return right(data);
  })(result);
}
