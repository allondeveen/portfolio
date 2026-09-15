import * as z from "zod";

export const GridSchema = z.object({
  id: z.string(),
  kind: z.literal("grid"),
  verticalAlign: z.boolean(),
});

export type Grid = z.infer<typeof GridSchema>;
