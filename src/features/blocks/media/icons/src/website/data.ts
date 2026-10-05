import { LexicalTextSchema } from "@allondeveen-portfolio/lexical-text/website/data";
import z from "zod";

export const IconsSchema = z.object({
  id: z.string(),
  kind: z.literal("icons"),
  tooltips: z
    .array(
      z.object({
        id: z.string().min(1),
        text: LexicalTextSchema.optional(),
        variant: z.enum(["default", "primary", "secondary", "disabled"]),
      }),
    )
    .min(1),
});

export type Icons = z.infer<typeof IconsSchema>;
