import { LexicalEditorStateSchema } from "@allondeveen-portfolio/lexical-text/cms";
import { allIcons } from "@allondeveen-portfolio/ui/icons/data";
import * as z from "zod";

export const ButtonSchema = z.object({
  id: z.string(),
  blockType: z.literal("button"),
  variant: z
    .literal("default")
    .or(z.literal("primary"))
    .or(z.literal("secondary"))
    .or(z.literal("disabled"))
    .default("default"),
  icon: z.enum(allIcons).exclude(["logo"]).or(z.literal("none")),
  location: z.discriminatedUnion("externality", [
    z.object({
      externality: z.literal("internal"),
      internal: z.object({
        value: z.string().min(1),
        relationTo: z.string().min(1),
      }),
    }),
    z.object({
      externality: z.literal("external"),
      external: z.string().min(1),
    }),
  ]),
  label: LexicalEditorStateSchema,
});

export type Button = z.infer<typeof ButtonSchema>;
