import { ContainerSchema } from "@allondeveen-portfolio/container-block/website/data";
import { CopyrightSchema } from "@allondeveen-portfolio/copyright-block/website/data";
import { EmbeddedVideoSchema } from "@allondeveen-portfolio/embedded-video-block/website/data";
import { GridSchema } from "@allondeveen-portfolio/grid-block/website";
import { GridItemSchema } from "@allondeveen-portfolio/grid-item-block/website/data";
import { GroupSchema } from "@allondeveen-portfolio/group-block/website/data";
import { HeadingSchema } from "@allondeveen-portfolio/heading-block/website/data";
import { HeroSchema } from "@allondeveen-portfolio/hero-block/website/data";
import { ImageSchema } from "@allondeveen-portfolio/image-block/website/data";
import { LabelSchema } from "@allondeveen-portfolio/label-block/website/data";
import { ListSchema } from "@allondeveen-portfolio/list-block/website/data";
import { MenuSchema } from "@allondeveen-portfolio/menu-block/website/data";
import { QuoteSchema } from "@allondeveen-portfolio/quote-block/website/data";
import { RichTextSchema } from "@allondeveen-portfolio/rich-text-block/website/data";
import { SiteTitleSchema } from "@allondeveen-portfolio/site-title-block/website/data";
import { StackSchema } from "@allondeveen-portfolio/stack-block/website/data";
import { TextSectionSchema } from "@allondeveen-portfolio/text-section-block/website/data";
import * as z from "zod";

export const AnyBlockSchema = z.discriminatedUnion("kind", [
  ContainerSchema,
  CopyrightSchema,
  EmbeddedVideoSchema,
  GridSchema,
  GridItemSchema,
  GroupSchema,
  HeadingSchema,
  HeroSchema,
  ImageSchema,
  LabelSchema,
  ListSchema,
  MenuSchema,
  QuoteSchema,
  RichTextSchema,
  SiteTitleSchema,
  StackSchema,
  TextSectionSchema,
]);

export type AnyBlock = z.infer<typeof AnyBlockSchema>;
