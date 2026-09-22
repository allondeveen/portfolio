import { LexicalTextSchema } from "@allondeveen-portfolio/lexical-text/website/data";
import * as z from "zod";

export const LabelSchema = z.object({
  id: z.string(),
  kind: z.literal("label"),
  variant: z
    .literal("default")
    .or(z.literal("primary"))
    .or(z.literal("secondary"))
    .or(z.literal("disabled")),
  text: LexicalTextSchema,
});

export type Label = z.infer<typeof LabelSchema>;
