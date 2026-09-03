import { getDescription as blockGetDescription } from "@allondeveen-portfolio/hero-block/cms";

import { DocumentWithBlocksSchema } from "../hooks/validation/atLeastOneBlock";

import type { JsonObject } from "payload";

export function getDescription(document: JsonObject): string {
  const documentResult = DocumentWithBlocksSchema.safeParse(document);
  if (!documentResult.success) {
    return "";
  }
  return blockGetDescription(documentResult.data.blocks);
}
