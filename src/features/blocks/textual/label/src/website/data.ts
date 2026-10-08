import { LexicalTextSchema } from "@allondeveen-portfolio/lexical-text/website/data";
import { VariantSchema } from "@allondeveen-portfolio/variant-property/website/data";
import * as z from "zod";

export const LabelSchema = z.object({
  id: z.string(),
  kind: z.literal("label"),
  variant: VariantSchema,
  text: LexicalTextSchema,
});

export type Label = z.infer<typeof LabelSchema>;
