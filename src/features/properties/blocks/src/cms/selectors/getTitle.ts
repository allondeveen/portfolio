import { getTitle as blockGetTitle } from "@allondeveen-portfolio/hero-block/cms";

import { DocumentWithBlocksSchema } from "../hooks/validation/atLeastOneBlock";

import type { JsonObject } from "payload";

export function getTitle(document: JsonObject): string {
  const documentResult = DocumentWithBlocksSchema.safeParse(document);
  if (!documentResult.success) {
    return "";
  }
  return blockGetTitle(documentResult.data.blocks);
}
