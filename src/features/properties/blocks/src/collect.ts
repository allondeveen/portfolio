import { gridBlock } from "@allondeveen-portfolio/grid-block/config";
import { gridItemBlock } from "@allondeveen-portfolio/grid-item-block/config";
import { headingBlock } from "@allondeveen-portfolio/heading-block/config";
import { heroBlock } from "@allondeveen-portfolio/hero-block/config";
import { richTextblock } from "@allondeveen-portfolio/rich-text-block/config";

import type { Block, BlockSlug } from "payload";

export const allBlocks: Block[] = [
  // prevent collapse
  headingBlock,
  richTextblock,
  heroBlock,
  gridItemBlock,
  gridBlock,
];
export const allBlockTypes: BlockSlug[] = allBlocks.map((block) => block.slug) as BlockSlug[];
