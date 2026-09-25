import { MediaSchema } from "@allondeveen-portfolio/media/cms";
import { mapMedia } from "@allondeveen-portfolio/media/trpc-server";

import type { Image as CMSImage } from "../cms";
import type { Image } from "../website/data";
import type { Adapter } from "@allondeveen-portfolio/adapter/trpc-server";

export const mapImage: Adapter<CMSImage, Image> = async (image, context) => {
  const resolvedImage = await context.resolvePublic(
    {
      collection: "media",
      id: image.image,
    },
    MediaSchema,
  );
  const base = {
    id: image.id,
    kind: image.blockType,
  };
  if (resolvedImage.status !== "resolved") {
    return base;
  }
  const mappedImage = await mapMedia(resolvedImage.source, context);
  if (mappedImage.kind === "download") {
    return base;
  }
  return {
    ...base,
    image: mappedImage,
  };
};
