import type { Stack as CMSStack } from "../cms";
import type { Stack } from "../website/data";
import type { Adapter } from "@allondeveen-portfolio/adapter/trpc-server";

export const mapStack: Adapter<CMSStack, Stack> = async (gridItem) => {
  return {
    id: gridItem.id,
    kind: gridItem.blockType,
  };
};
