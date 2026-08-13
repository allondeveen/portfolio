import { findHero } from "./findHero";

import type { JsonObject } from "payload";

export function getTitle(document: JsonObject): string {
  const hero = findHero(document).at(0);

  if (!hero) {
    return "Allon de Veen";
  }

  const heading = hero.blocks.find((block) => block.blockType === "heading");
  const title = heading?.headingText;

  if (!title) {
    return "Allon de Veen";
  }

  return `${title} | Allon de Veen`;
}
