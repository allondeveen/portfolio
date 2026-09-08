import { deleteTags } from "@allondeveen-portfolio/caching";
import { getCloudflareContext } from "@opennextjs/cloudflare";

import type { CollectionAfterChangeHook } from "payload";

export const invalidateCache: CollectionAfterChangeHook = async () => {
  const { env } = getCloudflareContext();
  const tags: string[] = ["listing:articles", "listing:projects"];
  await deleteTags({
    cache: env.CACHE,
    tags,
  });
};
