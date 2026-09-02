import { validateEmail as validateEmailInternal } from "@allondeveen-portfolio/validate-email";

import type { FieldHook } from "payload";

export const validateEmail: FieldHook = ({ value }) => {
  const validationResult = validateEmailInternal(value);
  if (validationResult.success === false) {
    throw new Error(validationResult.error);
  }
  return value;
};
