import { LexicalTextSchema } from "@allondeveen-portfolio/lexical-text/website/data";
import * as z from "zod";

export const HeadingSchema = z.object({
  kind: z.literal("heading"),
  size: z.number().min(1).max(6),
  text: LexicalTextSchema,
  variant: z.literal("default").or(z.literal("muted")).or(z.literal("primary")),
});

export type Heading = z.infer<typeof HeadingSchema>;
