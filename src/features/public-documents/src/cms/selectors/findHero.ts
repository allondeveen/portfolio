import { type Heading, HeadingSchema } from "@allondeveen-portfolio/heading-block/cms";
import { type Hero, HeroSchema } from "@allondeveen-portfolio/hero-block/cms";
import { getLexicalText } from "@allondeveen-portfolio/lexical-text/cms";
import { type RichText, RichTextSchema } from "@allondeveen-portfolio/rich-text-block/cms";

import { DocumentSchema as InternalDocumentSchema } from "../data";

import type { JsonObject } from "payload";

const DocumentSchema = InternalDocumentSchema.pick({
  slug: true,
  title: true,
  blocks: true,
});

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

export function findHero(document: JsonObject): HeroSearchResults[] {
  let heroes: HeroSearchResults[] = [];

  const documentResult = DocumentSchema.safeParse(document);

  if (!documentResult.success) {
    return heroes;
  }

  let position = 0;
  for (const candidateHero of documentResult.data.blocks ?? []) {
    const hero = HeroSchema.safeParse(candidateHero);

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
