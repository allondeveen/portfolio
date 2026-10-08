import { LexicalEditorStateSchema } from "@allondeveen-portfolio/lexical-text/cms";
import { allIcons } from "@allondeveen-portfolio/ui/icons/data";
import { VariantSchema } from "@allondeveen-portfolio/variant-property/cms";
import * as z from "zod";

export const IconSchema = z.object({
  id: z.string(),
  blockType: z.literal("icon"),
  variant: VariantSchema,
  icon: z.enum(allIcons),
  title: LexicalEditorStateSchema.nullish(),
});

export type Icon = z.infer<typeof IconSchema>;
