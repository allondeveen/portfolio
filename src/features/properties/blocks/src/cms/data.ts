import { GridSchema } from "@allondeveen-portfolio/grid-block/cms";
import { GridItemSchema } from "@allondeveen-portfolio/grid-item-block/cms";
import { HeadingSchema } from "@allondeveen-portfolio/heading-block/cms";
import { HeroSchema } from "@allondeveen-portfolio/hero-block/cms";
import { RichTextSchema } from "@allondeveen-portfolio/rich-text-block/cms";
import { StackSchema } from "@allondeveen-portfolio/stack-block/cms";
import * as z from "zod";

export const BlockSchema = z.discriminatedUnion("blockType", [
  HeadingSchema,
  RichTextSchema,
  HeroSchema,
  GridItemSchema,
  GridSchema,
  StackSchema,
]);

export type Block = z.infer<typeof BlockSchema>;
