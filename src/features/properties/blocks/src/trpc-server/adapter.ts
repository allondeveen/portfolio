import { mapHeading } from "@allondeveen-portfolio/heading-block/trpc-server";
import { mapHero } from "@allondeveen-portfolio/hero-block/trpc-server";
import { mapRichText } from "@allondeveen-portfolio/rich-text-block/trpc-server";

import type { Block as CMSBlock } from "../cms";
import type { Block } from "../website/data";
import type { MappingContext } from "@allondeveen-portfolio/adapter/trpc-server";
import type { Hero as CMSHero } from "@allondeveen-portfolio/hero-block/cms";
import type { Hero } from "@allondeveen-portfolio/hero-block/website/data";

export async function mapBlock(
  block: CMSHero["blocks"][number],
  context: MappingContext,
): Promise<Hero["blocks"][number]>;
export async function mapBlock(block: CMSBlock, context: MappingContext): Promise<Block>;
export async function mapBlock(block: CMSBlock, context: MappingContext): Promise<Block> {
  switch (block.blockType) {
    case "heading":
      return mapHeading(block, context);
    case "richText":
      return mapRichText(block, context);
    case "hero":
      return await mapHero(block, context, mapBlock);
  }
}
