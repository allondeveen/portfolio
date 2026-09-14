import { BlockSchema } from "@allondeveen-portfolio/blocks-property/cms";
import z from "zod";

export const ErrorPageSchema = z.object({
  blocks: z.array(BlockSchema).min(1),
});

export type ErrorPage = z.infer<typeof ErrorPageSchema>;
