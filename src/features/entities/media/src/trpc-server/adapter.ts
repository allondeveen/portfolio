import { getCloudflareContext } from "@opennextjs/cloudflare";

import type { Media as CMSMedia } from "../cms/data";
import type { Media } from "../website/data";
import type { Adapter } from "@allondeveen-portfolio/adapter/trpc-server";

export const mapMedia: Adapter<CMSMedia, Media> = (media) => {
  const { env } = getCloudflareContext();
  const url = `${env.MEDIA_URL}/${media.prefix}/${media.filename}`;
  const base = {
    id: media.id,
    name: media.name,
    caption: media.caption || undefined,
    credits: media.credits || undefined,
    url,
  };
  if (media.type === "download") {
    return {
      kind: "download",
      ...base,
    };
  }
  return {
    kind: "image",
    alt: media.alt as string,
    width: media.width as number,
    height: media.height as number,
    sizes: [
      {
        url,
        width: media.width as number,
        height: media.height as number,
      },
    ],
    ...base,
  };
};
