import { type RichTextResult } from "@allondeveen-portfolio/hero-block/cms";
import { type Either, flatMap, left, right } from "fp-ts/lib/Either";

import { childBlockValidationError } from "../errors";

import type { ValidationError } from "payload";

export function baseRichTextHasText(parents: string[] = []) {
  return (result: Either<ValidationError, RichTextResult | undefined>) => {
    return flatMap((data: RichTextResult | undefined) => {
      if (data !== undefined && !data.text?.trim()) {
        return left(childBlockValidationError("text", "Is required.", [...parents, "richText"]));
      }
      return right(data);
    })(result);
  };
}

export const richTextHasText = baseRichTextHasText();
