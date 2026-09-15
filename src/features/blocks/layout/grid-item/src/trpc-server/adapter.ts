import type { GridItem as CMSGridItem } from "../cms";
import type { GridItem } from "../website/data";
import type { Adapter } from "@allondeveen-portfolio/adapter/trpc-server";

export const mapGridItem: Adapter<CMSGridItem, GridItem> = async (gridItem) => {
  return {
    id: gridItem.id,
    kind: gridItem.blockType,
    size: gridItem.size,
  };
};
