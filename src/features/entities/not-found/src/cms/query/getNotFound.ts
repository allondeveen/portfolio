import { type NotFoundContent, NotFoundContentSchema } from "../data";

import type { JsonObject, Payload } from "payload";

export function getNotFoundNoParsing(payload: Payload): Promise<JsonObject> {
  return payload.findGlobal({
    slug: "not-found",
  });
}

export async function getNotFound(payload: Payload): Promise<NotFoundContent> {
  const notFoundResponse = await getNotFoundNoParsing(payload);
  return NotFoundContentSchema.parse(notFoundResponse);
}
