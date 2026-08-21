import type { Grid as CMSGrid } from "../cms";
import type { Grid } from "../website/data";
import type { Adapter, RecursiveAdapter } from "@allondeveen-portfolio/adapter/trpc-server";

type CMSGridChildren = CMSGrid["blocks"][number];
type GridChildren = Grid["blocks"][number];

type RecurseFunction = Adapter<CMSGridChildren, GridChildren>;

export const mapGrid: RecursiveAdapter<CMSGrid, Grid, RecurseFunction> = async (
  grid,
  context,
  recurse,
) => {
  return {
    id: grid.id,
    kind: grid.blockType,
    blocks: await Promise.all(grid.blocks.filter(Boolean).map((value) => recurse(value, context))),
  };
};
