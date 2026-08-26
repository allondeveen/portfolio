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
  if (resolvedImage.status !== "resolved") {
    return {
      id: image.id,
      kind: image.blockType,
    };
  }
  return {
    id: image.id,
    kind: image.blockType,
    image: await mapMedia(resolvedImage.source, context),
  };
};
