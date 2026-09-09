import { APIError, type CollectionBeforeValidateHook, type JsonObject } from "payload";
import z from "zod";

import { RedirectPlan } from "../plan";

import type { Redirect } from "../data";

export const validateRedirects: CollectionBeforeValidateHook = async ({
  req,
  operation,
  data,
  originalDoc,
}) => {
  try {
    const plan = await RedirectPlan.load(req);
    let value: Redirect;
    if (operation === "create") {
      value = plan.add({
        ...originalDoc,
        ...data,
      } as JsonObject);
    } else {
      value = plan.update({
        ...originalDoc,
        ...data,
      } as JsonObject);
    }
    await plan.validate();
    return value;
  } catch (e) {
    if (e instanceof z.ZodError) {
      throw new APIError("Redirect schema mismatch.", 400);
    } else if (typeof e === "string") {
      throw new APIError(e, 400);
    }
    throw e;
  }
};
