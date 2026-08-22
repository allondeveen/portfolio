import { GridItemSchema } from "@allondeveen-portfolio/grid-item-block/cms";
import * as z from "zod";

export const GridSchema = z.object({
  id: z.string(),
  blockType: z.literal("grid"),
  verticalAlign: z.boolean(),
  blocks: z.array(GridItemSchema).min(1),
});

export type Grid = z.infer<typeof GridSchema>;
