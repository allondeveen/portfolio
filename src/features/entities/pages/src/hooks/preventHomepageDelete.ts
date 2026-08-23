import { type CollectionBeforeDeleteHook, ValidationError } from "payload";

export const preventHomepageDelete: CollectionBeforeDeleteHook = async ({ id, req }) => {
  const page = await req.payload.findByID({
    collection: "pages",
    id,
    depth: 0,
  });

  if (page.slug === "/") {
    throw new ValidationError({
      errors: [
        {
          path: "homepage",
          message: "The homepage cannot be deleted.",
        },
      ],
    });
  }
};
