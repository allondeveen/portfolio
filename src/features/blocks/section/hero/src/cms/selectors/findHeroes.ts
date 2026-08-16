import { type Heading, HeadingSchema } from "@allondeveen-portfolio/heading-block/cms";
import { getLexicalText } from "@allondeveen-portfolio/lexical-text/cms";
import { type RichText, RichTextSchema } from "@allondeveen-portfolio/rich-text-block/cms";
import * as z from "zod";

import { type Hero, HeroSchema } from "../data";

import type { JsonObject } from "payload";

const LenientHeroSchema = HeroSchema.omit({
  blocks: true,
}).and(
  z.object({
    blocks: z.array(z.unknown()).nullish(),
  }),
);

export type HeadingResult = Omit<Heading, "headingText"> & {
  headingText: string | null;
  position: number;
};

export type RichTextResult = Omit<RichText, "text"> & {
  text: string | null;
  position: number;
};

export type HeroBlocksBlockResult = HeadingResult | RichTextResult;

export type HeroResult = Omit<Hero, "blocks"> & {
  blocks: HeroBlocksBlockResult[];
};

export type HeroSearchResults = HeroResult & {
  position: number;
};

export function findHeroes(blocks: JsonObject[]): HeroSearchResults[] {
  let heroes: HeroSearchResults[] = [];

  let position = 0;
  for (const candidateHero of blocks) {
    const hero = LenientHeroSchema.safeParse(candidateHero);

    if (!hero.success) {
      position++;
      continue;
    }

    let blocks: HeroBlocksBlockResult[] = [];

    let headingPosition = 0;
    for (const candidateHeading of hero.data.blocks ?? []) {
      const heading = HeadingSchema.safeParse(candidateHeading);

      if (!heading.success) {
        headingPosition++;
        continue;
      }

      blocks = [
        ...blocks,
        {
          ...heading.data,
          headingText: getLexicalText(heading.data.headingText),
          position: headingPosition,
        },
      ];

      headingPosition++;
    }

    let richTextPosition = 0;
    for (const candidateRichText of hero.data.blocks ?? []) {
      const richText = RichTextSchema.safeParse(candidateRichText);

      if (!richText.success) {
        richTextPosition++;
        continue;
      }

      blocks = [
        ...blocks,
        {
          ...richText.data,
          text: getLexicalText(richText.data.text),
          position: richTextPosition,
        },
      ];

      richTextPosition++;
    }

    heroes = [
      ...heroes,
      {
        ...hero.data,
        blocks,
        position,
      },
    ];

    position++;
  }

  return heroes;
}
