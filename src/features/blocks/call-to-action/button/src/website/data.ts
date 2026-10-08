import { LexicalTextSchema } from "@allondeveen-portfolio/lexical-text/website/data";
import { allIcons } from "@allondeveen-portfolio/ui/icons/data";
import { VariantSchema } from "@allondeveen-portfolio/variant-property/website/data";
import * as z from "zod";

export const ButtonSchema = z.object({
  id: z.string(),
  kind: z.literal("button"),
  variant: VariantSchema,
  icon: z.enum(allIcons).exclude(["logo"]).or(z.literal("none")),
  externality: z.literal("internal").or(z.literal("external")),
  location: z.string().min(1),
  label: LexicalTextSchema,
});

export type Button = z.infer<typeof ButtonSchema>;
