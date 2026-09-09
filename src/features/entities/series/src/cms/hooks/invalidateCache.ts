import { deleteTags } from "@allondeveen-portfolio/caching";
import { getCloudflareContext } from "@opennextjs/cloudflare";

import type { CollectionAfterChangeHook } from "payload";

export const invalidateCache: CollectionAfterChangeHook = async ({ doc }) => {
  const { env } = getCloudflareContext();
  await deleteTags({
    cache: env.CACHE,
    tags: [`series:${doc.id}`],
  });
};
