import { GridSchema } from "@allondeveen-portfolio/grid-block/website";
import { GridItemSchema } from "@allondeveen-portfolio/grid-item-block/website/data";
import { HeadingSchema } from "@allondeveen-portfolio/heading-block/website/data";
import { HeroSchema } from "@allondeveen-portfolio/hero-block/website/data";
import { MenuSchema } from "@allondeveen-portfolio/menu-block/website/data";
import { RichTextSchema } from "@allondeveen-portfolio/rich-text-block/website/data";
import { StackSchema } from "@allondeveen-portfolio/stack-block/website/data";
import * as z from "zod";

export const BlockSchema = z.discriminatedUnion("kind", [
  HeadingSchema,
  RichTextSchema,
  HeroSchema,
  GridItemSchema,
  GridSchema,
  StackSchema,
  MenuSchema,
]);

export type Block = z.infer<typeof BlockSchema>;
