import { BlockSchema } from "@allondeveen-portfolio/blocks-property/cms";
import * as z from "zod";

export const TemplateSchema = z.object({
  id: z.string().min(1),
  location: z.string().min(1),
  blocks: z.array(BlockSchema),
});

export type Template = z.infer<typeof TemplateSchema>;
