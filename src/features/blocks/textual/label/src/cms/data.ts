import { LexicalEditorStateSchema } from "@allondeveen-portfolio/lexical-text/cms";
import * as z from "zod";

export const LabelSchema = z.object({
  id: z.string(),
  blockType: z.literal("label"),
  variant: z
    .literal("default")
    .or(z.literal("primary"))
    .or(z.literal("secondary"))
    .or(z.literal("disabled"))
    .default("default"),
  text: LexicalEditorStateSchema,
});

export type Label = z.infer<typeof LabelSchema>;
