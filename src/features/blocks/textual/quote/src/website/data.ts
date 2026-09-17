import { LexicalTextSchema } from "@allondeveen-portfolio/lexical-text/website/data";
import * as z from "zod";

export const QuoteSchema = z.object({
  id: z.string(),
  kind: z.literal("quote"),
  quote: LexicalTextSchema,
  author: LexicalTextSchema.optional(),
});

export type Quote = z.infer<typeof QuoteSchema>;
