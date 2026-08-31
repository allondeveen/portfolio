import { BlockSchema } from "@allondeveen-portfolio/blocks-property/website/data";
import z from "zod";

export const MaintenanceContentSchema = z.object({
  header: z
    .object({
      location: z.literal("header"),
      blocks: z.array(BlockSchema),
    })
    .optional(),
  blocks: z.array(BlockSchema).min(1),
});

export type MaintenanceContent = z.infer<typeof MaintenanceContentSchema>;
