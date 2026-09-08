import { deleteTags } from "@allondeveen-portfolio/caching";
import { getCloudflareContext } from "@opennextjs/cloudflare";

import type { CollectionAfterChangeHook } from "payload";

export const invalidateCache: CollectionAfterChangeHook = async ({ doc, previousDoc }) => {
  const { env } = getCloudflareContext();
  let tags: string[] = [];
  if (doc.location === "header" || previousDoc.location === "header") {
    tags = [...tags, "header"];
  }
  if (doc.location === "footer" || previousDoc.location === "footer") {
    tags = [...tags, "footer"];
  }
  await deleteTags({
    cache: env.CACHE,
    tags,
  });
};
