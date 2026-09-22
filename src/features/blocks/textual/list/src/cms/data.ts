import { LexicalEditorStateSchema } from "@allondeveen-portfolio/lexical-text/cms";
import * as z from "zod";

export const ListSchema = z.object({
  id: z.string(),
  blockType: z.literal("list"),
  enumeration: z.discriminatedUnion("listStyleType", [
    z.object({
      type: z.literal("ordered").or(z.literal("unordered")),
      listStyleType: z.literal("image"),
      defaultImage: z.string().min(0),
    }),
    z.object({
      type: z.literal("ordered").or(z.literal("unordered")),
      listStyleType: z
        .literal("default")
        .or(z.literal("disc"))
        .or(z.literal("circle"))
        .or(z.literal("square"))
        .or(z.literal("decimal-leading-zero"))
        .or(z.literal("lower-alpha"))
        .or(z.literal("upper-alpha"))
        .or(z.literal("hebrew"))
        .or(z.literal("lower-roman"))
        .or(z.literal("upper-roman"))
        .or(z.literal("none"))
        .default("default"),
    }),
  ]),
  items: z
    .array(
      z.object({
        value: LexicalEditorStateSchema,
        image: z.string().nullish(),
        order: z.number(),
      }),
    )
    .min(1),
});

export type List = z.infer<typeof ListSchema>;
