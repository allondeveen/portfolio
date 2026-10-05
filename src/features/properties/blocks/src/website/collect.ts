import { ButtonSchema } from "@allondeveen-portfolio/button-block/website/data";
import { ButtonGroupSchema } from "@allondeveen-portfolio/button-group-block/website/data";
import { ContainerSchema } from "@allondeveen-portfolio/container-block/website/data";
import { CopyrightSchema } from "@allondeveen-portfolio/copyright-block/website/data";
import { EmbeddedVideoSchema } from "@allondeveen-portfolio/embedded-video-block/website/data";
import { FileDownloadSchema } from "@allondeveen-portfolio/file-download-block/website/data";
import { GallerySchema } from "@allondeveen-portfolio/gallery-block/website/data";
import { GridSchema } from "@allondeveen-portfolio/grid-block/website";
import { GridItemSchema } from "@allondeveen-portfolio/grid-item-block/website/data";
import { GroupSchema } from "@allondeveen-portfolio/group-block/website/data";
import { HeadingSchema } from "@allondeveen-portfolio/heading-block/website/data";
import { HeroSchema } from "@allondeveen-portfolio/hero-block/website/data";
import { IconSchema } from "@allondeveen-portfolio/icon-block/website/data";
import { IconsSchema } from "@allondeveen-portfolio/icons-block/website/data";
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
  ButtonSchema,
  ButtonGroupSchema,
  ContainerSchema,
  CopyrightSchema,
  EmbeddedVideoSchema,
  FileDownloadSchema,
  GallerySchema,
  GridSchema,
  GridItemSchema,
  GroupSchema,
  HeadingSchema,
  HeroSchema,
  IconSchema,
  IconsSchema,
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
