import { validateMeta } from "@allondeveen-portfolio/seo-validation";
import { APIError, type CollectionBeforeChangeHook } from "payload";
import z from "zod";

export const validateSEO: CollectionBeforeChangeHook = async ({ data }) => {
  try {
    validateMeta(data.meta);
  } catch (e) {
    if (e instanceof z.ZodError) {
      throw new APIError(
        `SEO: ${e.issues.at(0) ? `${e.issues.at(0)?.path} is required` : "validation failed"}`,
        400,
      );
    }
    throw new APIError("Something went wrong", 500);
  }
};
