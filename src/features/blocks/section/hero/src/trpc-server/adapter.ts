import type { Hero as CMSHero } from "../cms";
import type { Hero } from "../website/data";
import type { Adapter, RecursiveAdapter } from "@allondeveen-portfolio/adapter/trpc-server";

type CMSHeroChild = CMSHero["blocks"][number];
type HeroChild = Hero["blocks"][number];

// type RecurseFunctionTypes = (block: CMSHeroChild) => Promise<HeroChild>;
type RecurseFunction = Adapter<CMSHeroChild, HeroChild>;

export const mapHero: RecursiveAdapter<CMSHero, Hero, RecurseFunction> = async (
  hero,
  context,
  recurse: RecurseFunction,
) => {
  return {
    id: hero.id,
    kind: hero.blockType,
    blocks: await Promise.all(hero.blocks.filter(Boolean).map((value) => recurse(value, context))),
  };
};
