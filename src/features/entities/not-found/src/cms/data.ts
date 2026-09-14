import { BlockSchema } from "@allondeveen-portfolio/blocks-property/cms";
import z from "zod";

export const NotFoundContentSchema = z.object({
  blocks: z.array(BlockSchema).min(1),
});

export type NotFoundContent = z.infer<typeof NotFoundContentSchema>;
