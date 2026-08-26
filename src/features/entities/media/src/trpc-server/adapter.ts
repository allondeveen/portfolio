import { getCloudflareContext } from "@opennextjs/cloudflare";

import type { Media as CMSMedia } from "../cms/data";
import type { Media } from "../website/data";
import type { Adapter } from "@allondeveen-portfolio/adapter/trpc-server";

export const mapMedia: Adapter<CMSMedia, Media> = (media) => {
  const { env } = getCloudflareContext();
  const url = `${env.MEDIA_URL}/${media.prefix}/${media.filename}`;
  return {
    id: media.id,
    name: media.name,
    alt: media.alt,
    caption: media.caption || undefined,
    credits: media.credits || undefined,
    url,
    width: media.width,
    height: media.height,
    sizes: [
      {
        url,
        width: media.width,
        height: media.height,
      },
    ],
  };
};
