import type { Hero as CMSHero } from "../cms";
import type { Hero } from "../website/data";
import type { Adapter } from "@allondeveen-portfolio/adapter/trpc-server";

export const mapHero: Adapter<CMSHero, Hero> = async (hero) => {
  return {
    id: hero.id,
    kind: hero.blockType,
    variant: hero.variant,
  };
};
