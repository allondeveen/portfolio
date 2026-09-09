import { deleteTags } from "@allondeveen-portfolio/caching";
import { getCloudflareContext } from "@opennextjs/cloudflare";

import type { CollectionAfterChangeHook } from "payload";

export const invalidateCache: CollectionAfterChangeHook = async ({ doc, previousDoc }) => {
  const { env } = getCloudflareContext();
  let tags: string[] = [];
  if (doc.location === previousDoc.location) {
    tags = [...tags, `menu:${doc.location}`];
  } else {
    tags = [...tags, `menu:${doc.location}`, `menu:${previousDoc.location}`];
  }
  if (doc.location === "main" || previousDoc.location === "main") {
    tags = [...tags, "header"];
  }
  await deleteTags({
    cache: env.CACHE,
    tags,
  });
};
