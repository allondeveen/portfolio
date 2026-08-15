import { HeadingSchema } from "@allondeveen-portfolio/heading-block/cms";
import { HeroSchema } from "@allondeveen-portfolio/hero-block/cms";
import { RichTextSchema } from "@allondeveen-portfolio/rich-text-block/cms";
import * as z from "zod";

export const BlockSchema = z.discriminatedUnion("blockType", [
  HeadingSchema,
  RichTextSchema,
  HeroSchema,
]);

export type Block = z.infer<typeof BlockSchema>;
