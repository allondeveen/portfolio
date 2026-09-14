import { documentValidation, heroValidation } from "@allondeveen-portfolio/blocks-property/cms";
import { pipe } from "fp-ts/lib/function";

import { type NotFoundContent } from "./data";
import { getNotFoundNoParsing } from "./query/getNotFound";

import type { SetupRequirementResult } from "@allondeveen-portfolio/setup-requirements";
import type { CMSSetupRequirements } from "@allondeveen-portfolio/setup-requirements/cms";
import type { PayloadRequest } from "payload";

const checkAttribute =
  <Key extends keyof NotFoundContent>(key: Key, label: string) =>
  async (req: PayloadRequest): Promise<SetupRequirementResult> => {
    try {
      const notFound = await getNotFoundNoParsing(req.payload);
      if (key in notFound) {
        return {
          status: "complete",
        };
      }
      return {
        status: "incomplete",
        missing: label,
      };
    } catch (e) {
      return {
        status: "error",
        error: `${e}`,
      };
    }
  };

async function validateBlocks(req: PayloadRequest): Promise<SetupRequirementResult> {
  try {
    const notFound = await getNotFoundNoParsing(req.payload);
    const result = pipe(notFound, documentValidation, heroValidation(true));
    if (result._tag === "Right") {
      return {
        status: "complete",
      };
    }
    return {
      status: "incomplete",
      missing: result.left.data.errors.at(0)?.path ?? "",
    };
  } catch (e) {
    return {
      status: "error",
      error: `${e}`,
    };
  }
}

async function checkBlocks(req: PayloadRequest): Promise<SetupRequirementResult> {
  const schemaValidationResult = await checkAttribute("blocks", "Blocks")(req);
  if (schemaValidationResult.status != "complete") {
    return schemaValidationResult;
  }
  const blockValidationResult = await validateBlocks(req);
  return blockValidationResult;
}

export const notFoundRequirements: CMSSetupRequirements = {
  label: "Not Found",
  requirements: [
    {
      label: "Blocks",
      instruction: "Setup the not found page blocks",
      check: checkBlocks,
    },
  ],
};
