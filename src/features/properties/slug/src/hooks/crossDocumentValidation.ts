import { findBySlug } from "@allondeveen-portfolio/public-documents/cms";
import { type FieldHook, type TypeWithID, ValidationError } from "payload";

type WithSlug = TypeWithID & {
  slug: string;
};

export const crossDocumentValidation: FieldHook<WithSlug> = async ({ value, req, originalDoc }) => {
  const conflict = await findBySlug({
    payload: req.payload,
    slug: value,
  });
  if (conflict && conflict.id !== originalDoc?.id) {
    const error = `The slug ${value} is already in use.`;
    throw new ValidationError({
      errors: [
        {
          path: "slug",
          label: error,
          message: error,
        },
      ],
    });
  }
  return value;
};
