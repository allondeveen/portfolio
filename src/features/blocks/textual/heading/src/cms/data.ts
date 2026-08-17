import { LexicalEditorStateSchema } from "@allondeveen-portfolio/lexical-text/cms";
import * as z from "zod";

export const HeadingSchema = z.object({
  id: z.string(),
  blockType: z.literal("heading"),
  size: z.number(),
  headingText: LexicalEditorStateSchema,
  variant: z.literal("default").or(z.literal("muted")).or(z.literal("primary")),
});

export type Heading = z.infer<typeof HeadingSchema>;
