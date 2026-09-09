import { CopyrightSchema } from "@allondeveen-portfolio/copyright-block/cms";
import { GridSchema } from "@allondeveen-portfolio/grid-block/cms";
import { GridItemSchema } from "@allondeveen-portfolio/grid-item-block/cms";
import { HeadingSchema } from "@allondeveen-portfolio/heading-block/cms";
import { HeroSchema } from "@allondeveen-portfolio/hero-block/cms";
import { ImageSchema } from "@allondeveen-portfolio/image-block/cms";
import { MenuSchema } from "@allondeveen-portfolio/menu-block/cms";
import { RichTextSchema } from "@allondeveen-portfolio/rich-text-block/cms";
import { SiteTitleSchema } from "@allondeveen-portfolio/site-title-block/cms";
import { StackSchema } from "@allondeveen-portfolio/stack-block/cms";
import * as z from "zod";

export const BlockSchema = z.discriminatedUnion("blockType", [
  HeadingSchema,
  RichTextSchema,
  HeroSchema,
  GridItemSchema,
  GridSchema,
  StackSchema,
  MenuSchema,
  ImageSchema,
  SiteTitleSchema,
  CopyrightSchema,
]);

export type Block = z.infer<typeof BlockSchema>;
