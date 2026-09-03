import { validateEmail as validateEmailInternal } from "@allondeveen-portfolio/validate-email";
import { type FieldHook, ValidationError } from "payload";

export const validateEmail: FieldHook = ({ value }) => {
  const validationResult = validateEmailInternal(value);
  if (validationResult.success === false) {
    throw new ValidationError({
      errors: [
        {
          path: "email",
          label: validationResult.error,
          message: validationResult.error,
        },
      ],
    });
  }
  return value;
};
