import { findHero } from "./findHero";

import type { JsonObject } from "payload";

export function getDescription(document: JsonObject): string {
  const hero = findHero(document).at(0);

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
