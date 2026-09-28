import type { Gallery as CMSGallery } from "../cms";
import type { Gallery } from "../website/data";
import type { Adapter } from "@allondeveen-portfolio/adapter/trpc-server";

export const mapGallery: Adapter<CMSGallery, Gallery> = async (gallery) => {
  return {
    id: gallery.id,
    kind: gallery.blockType,
    layout: gallery.layout,
  };
};
