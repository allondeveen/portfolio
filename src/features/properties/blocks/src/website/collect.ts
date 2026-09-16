import { ContainerSchema } from "@allondeveen-portfolio/container-block/website/data";
import { CopyrightSchema } from "@allondeveen-portfolio/copyright-block/website/data";
import { GridSchema } from "@allondeveen-portfolio/grid-block/website";
import { GridItemSchema } from "@allondeveen-portfolio/grid-item-block/website/data";
import { GroupSchema } from "@allondeveen-portfolio/group-block/website/data";
import { HeadingSchema } from "@allondeveen-portfolio/heading-block/website/data";
import { HeroSchema } from "@allondeveen-portfolio/hero-block/website/data";
import { ImageSchema } from "@allondeveen-portfolio/image-block/website/data";
import { MenuSchema } from "@allondeveen-portfolio/menu-block/website/data";
import { RichTextSchema } from "@allondeveen-portfolio/rich-text-block/website/data";
import { SiteTitleSchema } from "@allondeveen-portfolio/site-title-block/website/data";
import { StackSchema } from "@allondeveen-portfolio/stack-block/website/data";
import * as z from "zod";

export const AnyBlockSchema = z.discriminatedUnion("kind", [
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
  ContainerSchema,
  GroupSchema,
]);

export type AnyBlock = z.infer<typeof AnyBlockSchema>;
