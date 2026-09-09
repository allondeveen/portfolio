import { type Redirect, RedirectSchema } from "../data";
import { normaliseAndEncode } from "../plan";

import type { Payload } from "payload";

export async function findBySource(
  payload: Payload,
  source: string,
): Promise<Redirect | undefined> {
  const redirectResults = await payload.find({
    collection: "redirects",
    where: {
      source: {
        equals: normaliseAndEncode(source),
      },
      active: {
        equals: true,
      },
    },
  });
  const redirectData = redirectResults.docs.at(0);
  if (redirectData === undefined) {
    return undefined;
  }
  return RedirectSchema.parse(redirectData);
}
