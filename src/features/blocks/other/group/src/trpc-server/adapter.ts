import type { Group as CMSGroup } from "../cms";
import type { Group } from "../website/data";
import type { Adapter } from "@allondeveen-portfolio/adapter/trpc-server";

export const mapGroup: Adapter<CMSGroup, Group> = async (gridItem) => {
  return {
    id: gridItem.id,
    kind: gridItem.blockType,
  };
};
