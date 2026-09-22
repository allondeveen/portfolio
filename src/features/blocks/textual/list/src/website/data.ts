import { LexicalTextSchema } from "@allondeveen-portfolio/lexical-text/website/data";
import { MediaSchema } from "@allondeveen-portfolio/media/website/data";
import * as z from "zod";

const ListBaseSchema = z.object({
  id: z.string(),
  kind: z.literal("list"),
  type: z.literal("ordered").or(z.literal("unordered")),
});

export const ListSchema = z.discriminatedUnion("listStyle", [
  ListBaseSchema.extend({
    listStyle: z.literal("image"),
    items: z
      .array(
        z.object({
          text: LexicalTextSchema,
          image: MediaSchema,
          order: z.number(),
        }),
      )
      .min(1),
  }),
  ListBaseSchema.extend({
    listStyle: z
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
      .or(z.literal("none")),
    items: z
      .array(
        z.object({
          text: LexicalTextSchema,
          order: z.number(),
        }),
      )
      .min(1),
  }),
]);

export type List = z.infer<typeof ListSchema>;
