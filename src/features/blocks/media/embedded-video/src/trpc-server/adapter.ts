import { MediaSchema } from "@allondeveen-portfolio/media/cms";
import { mapMedia } from "@allondeveen-portfolio/media/trpc-server";

import type { EmbeddedVideo as CMSEmbeddedVideo } from "../cms";
import type { EmbeddedVideo } from "../website/data";
import type { Adapter } from "@allondeveen-portfolio/adapter/trpc-server";

export const mapEmbeddedVideo: Adapter<CMSEmbeddedVideo, EmbeddedVideo> = async (
  embeddedvideo,
  context,
) => {
  const resolvedCoverImage = embeddedvideo.coverImage
    ? await context.resolvePublic(
        {
          collection: "media",
          id: embeddedvideo.coverImage,
        },
        MediaSchema,
      )
    : null;
  const base = {
    id: embeddedvideo.id,
    kind: embeddedvideo.blockType,
    videoUrl: embeddedvideo.videoUrl,
  };
  if (!resolvedCoverImage || (resolvedCoverImage && resolvedCoverImage?.status !== "resolved")) {
    return base;
  }
  const mappedCoverImage = await mapMedia(resolvedCoverImage.source, context);
  if (mappedCoverImage.kind === "download") {
    return base;
  }
  return {
    ...base,
    coverImage: mappedCoverImage,
  };
};
