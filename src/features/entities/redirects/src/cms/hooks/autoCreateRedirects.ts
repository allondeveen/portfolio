import { APIError, type CollectionAfterChangeHook } from "payload";
import z from "zod";

import { RedirectPlan } from "../plan";

export const autoCreateRedirects: CollectionAfterChangeHook = async ({ req, doc, previousDoc }) => {
  if (typeof doc.slug === "string" && typeof previousDoc.slug === "string") {
    if (doc.slug !== previousDoc.slug) {
      try {
        const plan = await RedirectPlan.load(req);
        plan.create(previousDoc.slug, doc.slug);
        await plan.commit();
      } catch (e) {
        if (e instanceof z.ZodError) {
          throw new APIError("Redirect schema mismatch.", 400);
        } else if (typeof e === "string") {
          throw new APIError(e, 400);
        }
        throw e;
      }
    }
  } else {
    console.log("Using autoCreateRedirects in a collection that doesn't contain a slug field...");
  }
};
