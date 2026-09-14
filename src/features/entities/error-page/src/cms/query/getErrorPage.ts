import { type ErrorPage, ErrorPageSchema } from "../data";

import type { JsonObject, Payload } from "payload";

export function getErrorPageNoParsing(payload: Payload): Promise<JsonObject> {
  return payload.findGlobal({
    slug: "error-page",
  });
}

export async function getErrorPage(payload: Payload): Promise<ErrorPage> {
  const errorPageResponse = await getErrorPageNoParsing(payload);
  return ErrorPageSchema.parse(errorPageResponse);
}
