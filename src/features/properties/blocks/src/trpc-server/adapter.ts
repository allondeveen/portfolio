import { mapHeading } from "@allondeveen-portfolio/heading-block/trpc-server";
import { mapHero } from "@allondeveen-portfolio/hero-block/trpc-server";
import { mapRichText } from "@allondeveen-portfolio/rich-text-block/trpc-server";

import type { Block as CMSBlock } from "../cms";
import type { Block } from "../website";
import type { Hero as CMSHero } from "@allondeveen-portfolio/hero-block/cms";
import type { Hero } from "@allondeveen-portfolio/hero-block/website";

export async function mapBlock(block: CMSHero["blocks"][number]): Promise<Hero["blocks"][number]>;
export async function mapBlock(block: CMSBlock): Promise<Block>;
export async function mapBlock(block: CMSBlock): Promise<Block> {
  switch (block.blockType) {
    case "heading":
      return mapHeading(block);
    case "richText":
      return mapRichText(block);
    case "hero":
      return await mapHero(block, mapBlock);
  }
}
