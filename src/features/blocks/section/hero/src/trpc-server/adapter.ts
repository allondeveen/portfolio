import type { Hero as CMSHero } from "../cms";
import type { Hero } from "../website/data";

type CMSHeroChild = CMSHero["blocks"][number];
type HeroChild = Hero["blocks"][number];

type RecurseFunctionTypes = (block: CMSHeroChild) => Promise<HeroChild>;

export async function mapHero(hero: CMSHero, recurse: RecurseFunctionTypes): Promise<Hero> {
  return {
    kind: hero.blockType,
    blocks: await Promise.all(hero.blocks.filter(Boolean).map(recurse)),
  };
}
