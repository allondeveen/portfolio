import { deleteTags } from "@allondeveen-portfolio/caching";
import { getCloudflareContext } from "@opennextjs/cloudflare";

import type { CollectionAfterChangeHook } from "payload";

export const invalidateCache: CollectionAfterChangeHook = async ({ req, doc, previousDoc }) => {
  const { env } = getCloudflareContext();
  let tags: string[] = [];
  if (doc.slug === previousDoc.slug) {
    tags = [...tags, `route:${doc.slug}`];
  } else {
    tags = [...tags, `route:${doc.slug}`, `route:${previousDoc.slug}`];
    if (req.context["intermediates"] && Array.isArray(req.context["intermediates"])) {
      tags = [...tags, ...req.context["intermediates"].map((slug) => `route:${slug}`)];
    }
  }
  await deleteTags({
    cache: env.CACHE,
    tags,
  });
};
