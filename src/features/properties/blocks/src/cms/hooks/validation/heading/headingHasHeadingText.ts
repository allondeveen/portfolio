import { type HeadingResult } from "@allondeveen-portfolio/hero-block/cms";
import { type Either, flatMap, left, right } from "fp-ts/lib/Either";

import { childBlockValidationError } from "../errors";

import type { ValidationError } from "payload";

export function headingHasHeadingText(result: Either<ValidationError, HeadingResult>) {
  return flatMap((data: HeadingResult) => {
    if (data.headingText && !data.headingText?.trim()) {
      return left(
        childBlockValidationError("headingText", "Is required.", ["blocks", "hero", "heading"]),
      );
    }
    return right(data);
  })(result);
}
