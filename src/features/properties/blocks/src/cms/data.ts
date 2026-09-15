import { type Container, ContainerSchema } from "@allondeveen-portfolio/container-block/cms";
import { type Copyright, CopyrightSchema } from "@allondeveen-portfolio/copyright-block/cms";
import { type Grid, GridSchema } from "@allondeveen-portfolio/grid-block/cms";
import { type GridItem, GridItemSchema } from "@allondeveen-portfolio/grid-item-block/cms";
import { type Heading, HeadingSchema } from "@allondeveen-portfolio/heading-block/cms";
import { type Hero, HeroSchema } from "@allondeveen-portfolio/hero-block/cms";
import { type Image, ImageSchema } from "@allondeveen-portfolio/image-block/cms";
import { type Menu, MenuSchema } from "@allondeveen-portfolio/menu-block/cms";
import { type RichText, RichTextSchema } from "@allondeveen-portfolio/rich-text-block/cms";
import { type SiteTitle, SiteTitleSchema } from "@allondeveen-portfolio/site-title-block/cms";
import { type Stack, StackSchema } from "@allondeveen-portfolio/stack-block/cms";
import * as z from "zod";

type BlockChildren = {
  blocks: Block[];
};

type WithBlocks<Type> = Type & BlockChildren;

export type Block =
  | Heading
  | RichText
  | WithBlocks<Hero>
  | WithBlocks<GridItem>
  | WithBlocks<Grid>
  | WithBlocks<Stack>
  | WithBlocks<Container>
  | Menu
  | Image
  | SiteTitle
  | Copyright;

export const BlockSchema: z.ZodType<Block> = z.lazy(() => {
  function withBlocks<Type extends z.core.$ZodShape = z.core.$ZodLooseShape>(
    schema: z.ZodObject<Type>,
  ) {
    return schema.extend({
      blocks: z.array(BlockSchema).min(1),
    });
  }
  return z.discriminatedUnion("blockType", [
    HeadingSchema,
    RichTextSchema,
    withBlocks(HeroSchema),
    withBlocks(GridItemSchema),
    withBlocks(GridSchema),
    withBlocks(StackSchema),
    withBlocks(ContainerSchema),
    MenuSchema,
    ImageSchema,
    SiteTitleSchema,
    CopyrightSchema,
  ]);
});
