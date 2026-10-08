import { LexicalEditorStateSchema } from "@allondeveen-portfolio/lexical-text/cms";
import { VariantSchema } from "@allondeveen-portfolio/variant-property/cms";
import * as z from "zod";

export const LabelSchema = z.object({
  id: z.string(),
  blockType: z.literal("label"),
  variant: VariantSchema,
  text: LexicalEditorStateSchema,
});

export type Label = z.infer<typeof LabelSchema>;
