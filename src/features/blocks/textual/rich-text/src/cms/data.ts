import { LexicalEditorStateSchema } from "@allondeveen-portfolio/lexical-text/cms";
import * as z from "zod";

export const RichTextSchema = z.object({
  blockType: z.literal("richText"),
  text: LexicalEditorStateSchema,
});

export type RichText = z.infer<typeof RichTextSchema>;
