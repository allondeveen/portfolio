import { deleteTags } from "@allondeveen-portfolio/caching";
import { getCloudflareContext } from "@opennextjs/cloudflare";

import type { GlobalAfterChangeHook } from "payload";

export const invalidateCache: GlobalAfterChangeHook = async () => {
  const { env } = getCloudflareContext();
  await deleteTags({
    cache: env.CACHE,
    tags: ["site-settings", "header", "footer"],
  });
};
