import {
  findHeroes,
  type HeadingResult,
  type HeroSearchResults,
} from "@allondeveen-portfolio/hero-block/cms";
import { type FieldHook, type JsonObject, type TypeWithID, ValidationError } from "payload";
import z from "zod";

export const LenientDocument = z.object({
  blocks: z.array(z.record(z.string(), z.any())).min(1),
});

export const validateBlocks: FieldHook<TypeWithID & JsonObject> = ({ value, data }) => {
  if (!data) {
    throw new ValidationError({
      errors: [
        {
          path: "data undefined",
          message: "Data is undefined",
        },
      ],
    });
  }

  const documentResult = LenientDocument.safeParse(data);
  if (!documentResult.success) {
    throw new ValidationError({
      errors: [
        {
          path: "blocks",
          message: "Must have at least one block.",
        },
      ],
    });
  }

  const heroes = findHeroes(documentResult.data.blocks);

  if (heroes.length < 1) {
    throw new ValidationError({
      errors: [
        {
          path: "blocks",
          message: "Must have exactly 1 hero block.",
        },
      ],
    });
  }

  if (heroes.length > 1) {
    throw new ValidationError({
      errors: [
        {
          path: "blocks",
          message: "Can't have more than 1 hero block.",
        },
      ],
    });
  }

  const hero = heroes.at(0) as HeroSearchResults;
  const headings = hero.blocks.filter((block) => block.blockType === "heading");
  const headingCount = headings.length;

  if (headingCount < 1) {
    throw new ValidationError({
      errors: [
        {
          path: "heading",
          message: "Must have exactly 1 heading block.",
        },
      ],
    });
  }

  if (headingCount > 1) {
    throw new ValidationError({
      errors: [
        {
          path: "heading",
          message: "Can't have more than 1 heading block.",
        },
      ],
    });
  }

  const heading = headings.at(0) as HeadingResult;

  if (heading.size !== 1) {
    throw new ValidationError({
      errors: [
        {
          path: "heading",
          message: "Hero heading must have size 1.",
        },
      ],
    });
  }

  const richTextCount = hero.blocks.filter((block) => block.blockType === "richText").length;

  const slug = (<string>data.slug).startsWith("/") ? `${data.slug}` : `/${data.slug}`;

  if (richTextCount < 1 && slug != "/contact") {
    throw new ValidationError({
      errors: [
        {
          path: "richText",
          message: "Must at least 1 richText block.",
        },
      ],
    });
  }

  return value;
};
