import type { GridItem as CMSGridItem } from "../cms";
import type { GridItem } from "../website/data";
import type { Adapter, RecursiveAdapter } from "@allondeveen-portfolio/adapter/trpc-server";

type CMSGridItemChildren = CMSGridItem["blocks"][number];
type GridChildren = GridItem["blocks"][number];

type RecurseFunction = Adapter<CMSGridItemChildren, GridChildren>;

export const mapGridItem: RecursiveAdapter<CMSGridItem, GridItem, RecurseFunction> = async (
  gridItem,
  context,
  recurse,
) => {
  return {
    id: gridItem.id,
    kind: gridItem.blockType,
    size: gridItem.size,
    blocks: await Promise.all(
      gridItem.blocks.filter(Boolean).map((value) => recurse(value, context)),
    ),
  };
};
