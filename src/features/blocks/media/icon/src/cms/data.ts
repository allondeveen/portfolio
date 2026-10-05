import { LexicalEditorStateSchema } from "@allondeveen-portfolio/lexical-text/cms";
import { allIcons } from "@allondeveen-portfolio/ui/icons/data";
import * as z from "zod";

export const IconSchema = z.object({
  id: z.string(),
  blockType: z.literal("icon"),
  variant: z
    .literal("default")
    .or(z.literal("primary"))
    .or(z.literal("secondary"))
    .or(z.literal("disabled")),
  icon: z.enum(allIcons),
  title: LexicalEditorStateSchema.nullish(),
});

export type Icon = z.infer<typeof IconSchema>;
