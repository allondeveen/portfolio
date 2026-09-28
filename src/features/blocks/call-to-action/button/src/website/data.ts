import { LexicalTextSchema } from "@allondeveen-portfolio/lexical-text/website/data";
import { allIcons } from "@allondeveen-portfolio/ui/icons/data";
import * as z from "zod";

export const ButtonSchema = z.object({
  id: z.string(),
  kind: z.literal("button"),
  variant: z
    .literal("default")
    .or(z.literal("primary"))
    .or(z.literal("secondary"))
    .or(z.literal("disabled")),
  icon: z.enum(allIcons).exclude(["logo"]).or(z.literal("none")),
  externality: z.literal("internal").or(z.literal("external")),
  location: z.string().min(1),
  label: LexicalTextSchema,
});

export type Button = z.infer<typeof ButtonSchema>;
