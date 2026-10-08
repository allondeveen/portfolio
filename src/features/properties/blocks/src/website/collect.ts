import { type Button, ButtonSchema } from "@allondeveen-portfolio/button-block/website/data";
import {
  type ButtonGroup,
  ButtonGroupSchema,
} from "@allondeveen-portfolio/button-group-block/website/data";
import { type Code, CodeSchema } from "@allondeveen-portfolio/code-block/website/data";
import {
  type Container,
  ContainerSchema,
} from "@allondeveen-portfolio/container-block/website/data";
import {
  type Copyright,
  CopyrightSchema,
} from "@allondeveen-portfolio/copyright-block/website/data";
import {
  type EmbeddedVideo,
  EmbeddedVideoSchema,
} from "@allondeveen-portfolio/embedded-video-block/website/data";
import {
  type FileDownload,
  FileDownloadSchema,
} from "@allondeveen-portfolio/file-download-block/website/data";
import { type Gallery, GallerySchema } from "@allondeveen-portfolio/gallery-block/website/data";
import { type Grid, GridSchema } from "@allondeveen-portfolio/grid-block/website";
import { type GridItem, GridItemSchema } from "@allondeveen-portfolio/grid-item-block/website/data";
import { type Group, GroupSchema } from "@allondeveen-portfolio/group-block/website/data";
import { type Heading, HeadingSchema } from "@allondeveen-portfolio/heading-block/website/data";
import { type Hero, HeroSchema } from "@allondeveen-portfolio/hero-block/website/data";
import { type Icon, IconSchema } from "@allondeveen-portfolio/icon-block/website/data";
import { type Icons, IconsSchema } from "@allondeveen-portfolio/icons-block/website/data";
import { type Image, ImageSchema } from "@allondeveen-portfolio/image-block/website/data";
import { type Label, LabelSchema } from "@allondeveen-portfolio/label-block/website/data";
import { type List, ListSchema } from "@allondeveen-portfolio/list-block/website/data";
import { type Menu, MenuSchema } from "@allondeveen-portfolio/menu-block/website/data";
import { type Quote, QuoteSchema } from "@allondeveen-portfolio/quote-block/website/data";
import { type RichText, RichTextSchema } from "@allondeveen-portfolio/rich-text-block/website/data";
import {
  type SiteTitle,
  SiteTitleSchema,
} from "@allondeveen-portfolio/site-title-block/website/data";
import { type Stack, StackSchema } from "@allondeveen-portfolio/stack-block/website/data";
import {
  type Story,
  type StoryItems,
  StoryItemsSchema,
  StorySchema,
} from "@allondeveen-portfolio/story-block/website/data";
import {
  type TextSection,
  TextSectionSchema,
} from "@allondeveen-portfolio/text-section-block/website/data";
import * as z from "zod";

import { type Block, BlockSchema } from "./data";

export type AnyBlock =
  | Button
  | ButtonGroup
  | Code
  | Container
  | Copyright
  | EmbeddedVideo
  | FileDownload
  | Gallery
  | Grid
  | GridItem
  | Group
  | Heading
  | Hero
  | Image
  | Icon
  | Icons
  | Label
  | List
  | Menu
  | Quote
  | RichText
  | SiteTitle
  | Stack
  | (Story & {
      items: StoryItems<Block[]>;
    })
  | TextSection;

export const AnyBlockSchema: z.ZodType<AnyBlock> = z.lazy(() =>
  z.discriminatedUnion("kind", [
    ButtonSchema,
    ButtonGroupSchema,
    CodeSchema,
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
    StorySchema.extend({
      items: StoryItemsSchema(BlockSchema),
    }),
    TextSectionSchema,
  ]),
);
