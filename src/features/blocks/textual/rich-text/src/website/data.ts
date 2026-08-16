import { LexicalTextSchema } from "@allondeveen-portfolio/lexical-text/website/data";
import * as z from "zod";

export const RichTextSchema = z.object({
  kind: z.literal("richText"),
  text: LexicalTextSchema,
});

export type RichText = z.infer<typeof RichTextSchema>;
