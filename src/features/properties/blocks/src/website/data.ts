import { HeadingSchema } from "@allondeveen-portfolio/heading-block/website";
import { HeroSchema } from "@allondeveen-portfolio/hero-block/website";
import { RichTextSchema } from "@allondeveen-portfolio/rich-text-block/website";
import * as z from "zod";

export const BlockSchema = z.discriminatedUnion("kind", [
  HeadingSchema,
  RichTextSchema,
  HeroSchema,
]);

export type Block = z.infer<typeof BlockSchema>;
