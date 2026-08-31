import { BlockSchema } from "@allondeveen-portfolio/blocks-property/cms";
import z from "zod";

export const MaintenanceContentSchema = z.object({
  header: z.array(BlockSchema).nullable(),
  blocks: z.array(BlockSchema).min(1),
});

export type MaintenanceContent = z.infer<typeof MaintenanceContentSchema>;
