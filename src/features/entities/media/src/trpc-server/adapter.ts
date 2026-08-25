import type { Media as CMSMedia } from "../cms/data";
import type { Media } from "../website/data";
import type { Adapter } from "@allondeveen-portfolio/adapter/trpc-server";

export const mapMedia =
  (mediaHostName: string): Adapter<CMSMedia, Media> =>
  (media) => {
    const url = `${mediaHostName}/${media.prefix}/${media.filename}`;
    return {
      id: media.id,
      name: media.name,
      alt: media.alt,
      caption: media.caption,
      credits: media.credits,
      url,
      sizes: [
        {
          url,
          width: media.width,
          height: media.height,
        },
      ],
    };
  };
