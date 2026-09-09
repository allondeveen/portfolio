import { findHeroes, type HeroSearchResults } from "@allondeveen-portfolio/hero-block/cms";
import { type Either, flatMap, left, right } from "fp-ts/lib/Either";

import { blocksValidationError } from "../errors";

import type { DocumentWithBlocks } from "../atLeastOneBlock";
import type { ValidationError } from "payload";

export function exactlyOneHero(result: Either<ValidationError, DocumentWithBlocks>) {
  return flatMap((data: DocumentWithBlocks) => {
    const heroes = findHeroes(data.blocks);
    if (heroes.length !== 1) {
      return left(blocksValidationError("Must have exactly 1 hero block."));
    }
    return right(heroes.at(0) as HeroSearchResults);
  })(result);
}
