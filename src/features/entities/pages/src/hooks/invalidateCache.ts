import { deleteTags } from "@allondeveen-portfolio/caching";
import { getCloudflareContext } from "@opennextjs/cloudflare";

import type { CollectionAfterChangeHook } from "payload";

export const invalidateCache: CollectionAfterChangeHook = async ({ doc, previousDoc }) => {
  const { env } = getCloudflareContext();
  let tags: string[] = [];
  if (doc.slug === previousDoc.slug) {
    tags = [...tags, `route:${doc.slug}`];
  } else {
    tags = [...tags, `route:${doc.slug}`, `route:${previousDoc.slug}`];
  }
  await deleteTags({
    cache: env.CACHE,
    tags,
  });
};
