import { findHeroes } from "./findHeroes";

import type { JsonObject } from "payload";

export function getTitle(blocks: JsonObject[]): string {
  const hero = findHeroes(blocks).at(0);

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
