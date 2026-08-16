import { findHeroes } from "./findHeroes";

import type { JsonObject } from "payload";

export function getDescription(blocks: JsonObject[]): string {
  const hero = findHeroes(blocks).at(0);

  if (!hero) {
    return "";
  }

  const richText = hero.blocks.find((block) => block.blockType === "richText");
  const description = richText?.text;

  if (!description) {
    return "";
  }

  return description;
}
