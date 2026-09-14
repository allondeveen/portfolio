import { documentValidation, heroValidation } from "@allondeveen-portfolio/blocks-property/cms";
import { findBySlug } from "@allondeveen-portfolio/public-documents-queries/cms";
import { pipe } from "fp-ts/lib/function";

import { DocumentSchema } from "../cms";

import type { SetupRequirementResult } from "@allondeveen-portfolio/setup-requirements";
import type { CMSSetupRequirements } from "@allondeveen-portfolio/setup-requirements/cms";
import type { PayloadRequest } from "payload";

async function checkHomePage(req: PayloadRequest): Promise<SetupRequirementResult> {
  try {
    const page = await findBySlug({ payload: req.payload, slug: "/" });
    const pageParseResult = DocumentSchema.safeParse(page);
    if (pageParseResult.success) {
      return {
        status: "complete",
      };
    }
    return {
      status: "incomplete",
      missing: "Homepage",
    };
  } catch (e) {
    return {
      status: "error",
      error: `${e}`,
    };
  }
}

async function validateBlocks(req: PayloadRequest): Promise<SetupRequirementResult> {
  try {
    const page = await findBySlug({ payload: req.payload, slug: "/" });
    if (page) {
      const result = pipe(page, documentValidation, heroValidation(true));
      if (result._tag === "Right") {
        return {
          status: "complete",
        };
      }
      return {
        status: "incomplete",
        missing: result.left.data.errors.at(0)?.path ?? "",
      };
    }
    return {
      status: "incomplete",
      missing: "Home page",
    };
  } catch (e) {
    return {
      status: "error",
      error: `${e}`,
    };
  }
}

export const publicDocumentsRequirements: CMSSetupRequirements = {
  label: "Public documents",
  requirements: [
    {
      label: "Homepage",
      instruction: "Create a homepage",
      async check(req) {
        const homePageSchemaValidationResult = await checkHomePage(req);
        if (homePageSchemaValidationResult.status !== "complete") {
          return homePageSchemaValidationResult;
        }
        const homePageBlockValidationResult = validateBlocks(req);
        return homePageBlockValidationResult;
      },
    },
  ],
};
