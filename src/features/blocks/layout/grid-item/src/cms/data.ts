import * as z from "zod";

export const GridItemSchema = z.object({
  id: z.string(),
  blockType: z.literal("grid-item"),
  size: z.number().min(1).max(12),
});

export type GridItem = z.infer<typeof GridItemSchema>;
