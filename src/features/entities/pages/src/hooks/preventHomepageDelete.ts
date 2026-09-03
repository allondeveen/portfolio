import { APIError, type CollectionBeforeDeleteHook } from "payload";

export const preventHomepageDelete: CollectionBeforeDeleteHook = async ({ id, req }) => {
  const page = await req.payload.findByID({
    collection: "pages",
    id,
    depth: 0,
  });

  if (page.slug === "/") {
    throw new APIError("The homepage cannot be deleted.", 400);
  }
};
