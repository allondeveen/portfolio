import { getDescription as blockGetDescription } from "@allondeveen-portfolio/hero-block/cms";

import { LenientDocument } from "../hooks/validateBlocks";

import type { JsonObject } from "payload";

export function getDescription(document: JsonObject): string {
  const documentResult = LenientDocument.safeParse(document);
  if (!documentResult.success) {
    return "";
  }
  return blockGetDescription(documentResult.data.blocks);
}
