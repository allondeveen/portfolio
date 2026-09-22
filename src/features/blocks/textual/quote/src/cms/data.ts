import { LexicalEditorStateSchema } from "@allondeveen-portfolio/lexical-text/cms";
import * as z from "zod";

export const QuoteSchema = z.object({
  id: z.string(),
  blockType: z.literal("quote"),
  quote: LexicalEditorStateSchema,
  author: LexicalEditorStateSchema.nullish(),
});

export type Quote = z.infer<typeof QuoteSchema>;
