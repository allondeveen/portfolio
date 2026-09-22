import type { Grid as CMSGrid } from "../cms";
import type { Grid } from "../website/data";
import type { Adapter } from "@allondeveen-portfolio/adapter/trpc-server";

export const mapGrid: Adapter<CMSGrid, Grid> = async (grid) => {
  return {
    id: grid.id,
    kind: grid.blockType,
    verticalAlign: grid.verticalAlign,
  };
};
