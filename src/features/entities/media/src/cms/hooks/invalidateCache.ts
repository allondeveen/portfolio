import { deleteTags } from "@allondeveen-portfolio/caching";
import { getCloudflareContext } from "@opennextjs/cloudflare";

import type { CollectionAfterChangeHook } from "payload";

export const invalidateCache: CollectionAfterChangeHook = async ({ doc, previousDoc }) => {
  const { env } = getCloudflareContext();
  let tags: string[] = [];
  if (doc.type === "image" || previousDoc.type === "image") {
    tags = [...tags, `image:${doc.id}`];
  }
  const logoName = "Allon de Veen - Logo";
  if (doc.name === logoName || previousDoc.name === logoName) {
    tags = [...tags, "site-settings", "header", "footer"];
  }
  await deleteTags({
    cache: env.CACHE,
    tags,
  });
};
