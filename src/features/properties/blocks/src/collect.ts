import { headingBlock } from "@allondeveen-portfolio/heading-block/config";
import { heroBlock } from "@allondeveen-portfolio/hero-block/config";
import { richTextblock } from "@allondeveen-portfolio/rich-text-block/config";

import type { Block } from "payload";

export const allBlocks: Block[] = [headingBlock, richTextblock, heroBlock];
export const allBlockTypes: string[] = allBlocks.map((block) => block.slug);
