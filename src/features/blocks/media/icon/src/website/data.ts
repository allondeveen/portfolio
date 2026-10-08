import { LexicalTextSchema } from "@allondeveen-portfolio/lexical-text/website/data";
import { allIcons } from "@allondeveen-portfolio/ui/icons/data";
import { VariantSchema } from "@allondeveen-portfolio/variant-property/website/data";
import * as z from "zod";

export const IconSchema = z.object({
  id: z.string(),
  kind: z.literal("icon"),
  variant: VariantSchema,
  icon: z.enum(allIcons),
  title: LexicalTextSchema.optional(),
});

export type Icon = z.infer<typeof IconSchema>;
