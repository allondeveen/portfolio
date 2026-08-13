import {
  findHero,
  type HeadingResult,
  type HeroSearchResults,
} from "@allondeveen-portfolio/public-documents/cms";
import { type FieldHook, type JsonObject, type TypeWithID, ValidationError } from "payload";

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

  const heroes = findHero(data);

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
