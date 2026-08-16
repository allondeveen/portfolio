import { getTitle as blockGetTitle } from "@allondeveen-portfolio/hero-block/cms";

import { LenientDocument } from "../hooks/validateBlocks";

import type { JsonObject } from "payload";

export function getTitle(document: JsonObject): string {
  const documentResult = LenientDocument.safeParse(document);
  if (!documentResult.success) {
    return "";
  }
  return blockGetTitle(documentResult.data.blocks);
}
