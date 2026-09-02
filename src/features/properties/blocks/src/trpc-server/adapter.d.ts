import { type SiteTitleAdapterOptions } from "@allondeveen-portfolio/site-title-block/trpc-server";

import type { Block as CMSBlock } from "../cms";
import type { Block } from "../website/data";
import type { MappingContext } from "@allondeveen-portfolio/adapter/trpc-server";
import type { Grid as CMSGrid } from "@allondeveen-portfolio/grid-block/cms";
import type { Grid } from "@allondeveen-portfolio/grid-block/website/data";
import type { GridItem as CMSGridItem } from "@allondeveen-portfolio/grid-item-block/cms";
import type { GridItem } from "@allondeveen-portfolio/grid-item-block/website/data";
import type { Hero as CMSHero } from "@allondeveen-portfolio/hero-block/cms";
import type { Hero } from "@allondeveen-portfolio/hero-block/website/data";
import type { Stack as CMSStack } from "@allondeveen-portfolio/stack-block/cms";
import type { Stack } from "@allondeveen-portfolio/stack-block/website/data";

type BlockMapper = {
  (block: CMSHero["blocks"][number], context: MappingContext): Promise<Hero["blocks"][number]>;
  (block: CMSGrid["blocks"][number], context: MappingContext): Promise<Grid["blocks"][number]>;
  (
    block: CMSGridItem["blocks"][number],
    context: MappingContext,
  ): Promise<GridItem["blocks"][number]>;
  (block: CMSStack["blocks"][number], context: MappingContext): Promise<Stack["blocks"][number]>;
  (block: CMSBlock, context: MappingContext): Promise<Block>;
};
export type MapBlockOptions = {
  siteTitle: SiteTitleAdapterOptions;
};
export declare function mapBlock(options: MapBlockOptions): BlockMapper;
export {};
//# sourceMappingURL=adapter.d.ts.map
