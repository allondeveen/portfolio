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

function validationError(path: string, message: string) {
  return new ValidationError({
    errors: [
      {
        path: path,
        label: message,
        message: message,
      },
    ],
  });
}

function blocksValidationError(message: string) {
  return validationError("blocks", message);
}

function childBlockValidationError(path: string, message: string, parents: string[] = []) {
  return validationError([...parents, path].join("."), message);
}

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
    throw blocksValidationError("Must have at least one block.");
  }

  const heroes = findHeroes(documentResult.data.blocks);

  if (heroes.length < 1) {
    throw blocksValidationError("Must have exactly 1 hero block.");
  }

  if (heroes.length > 1) {
    throw blocksValidationError("Can't have more than 1 hero block.");
  }

  const hero = heroes.at(0) as HeroSearchResults;
  const headings = hero.blocks.filter((block) => block.blockType === "heading");
  const headingCount = headings.length;

  if (headingCount < 1) {
    throw childBlockValidationError("heading", "Must have exactly 1 heading block.", [
      "blocks",
      "hero",
    ]);
  }

  if (headingCount > 1) {
    throw childBlockValidationError("heading", "Can't have more than 1 heading block.", [
      "blocks",
      "hero",
    ]);
  }

  const heading = headings.at(0) as HeadingResult;

  if (heading.size !== 1) {
    throw childBlockValidationError("heading", "Hero heading must have size 1.", [
      "blocks",
      "hero",
    ]);
  }

  const richTextCount = hero.blocks.filter((block) => block.blockType === "richText").length;

  const slug = (<string>data.slug).startsWith("/") ? `${data.slug}` : `/${data.slug}`;

  if (richTextCount < 1 && slug != "/contact") {
    throw childBlockValidationError("richText", "Must at least 1 richText block.", [
      "blocks",
      "hero",
    ]);
  }

  return value;
};
