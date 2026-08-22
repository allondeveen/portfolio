import type { Stack as CMSStack } from "../cms";
import type { Stack } from "../website/data";
import type { Adapter, RecursiveAdapter } from "@allondeveen-portfolio/adapter/trpc-server";

type CMSGridItemChildren = CMSStack["blocks"][number];
type GridChildren = Stack["blocks"][number];

type RecurseFunction = Adapter<CMSGridItemChildren, GridChildren>;

export const mapStack: RecursiveAdapter<CMSStack, Stack, RecurseFunction> = async (
  gridItem,
  context,
  recurse,
) => {
  return {
    id: gridItem.id,
    kind: gridItem.blockType,
    blocks: await Promise.all(
      gridItem.blocks.filter(Boolean).map((value) => recurse(value, context)),
    ),
  };
};
