import type { FieldHook, TypeWithID } from "payload";

type WithParentDoc = TypeWithID & {
  parent?: string;
};

/**
 * Prefix the raw slug of the content with hierarchical segments and parent slug(s).
 * @param sanitisedHierarchicalSegment The configured, sanitised hierchical segments of the content type.
 * @returns The field hook that prefixes the slug with the hierarchical segments and the parent slug(s).
 */
export function prefixHierarchicalSegments(
  sanitisedHierarchicalSegment: string,
): FieldHook<WithParentDoc, string> {
  return async ({ value, req, data, originalDoc }) => {
    console.log(value);
    let parentSlug = "";
    let candidateValue = value?.replace(sanitisedHierarchicalSegment, "/") ?? "";
    if (data?.parent) {
      const parent = await req.payload.findByID({
        collection: "pages",
        id: data?.parent,
      });
      if (parent.slug) {
        parentSlug = parent.slug;
        parentSlug = parentSlug.replace(sanitisedHierarchicalSegment, "");
        parentSlug = parentSlug.replace(/^\/+/, "");
        if (!parentSlug.endsWith("/")) {
          parentSlug = parentSlug + "/";
        }
        if (parentSlug == "/") {
          parentSlug = "";
        }
      }
    } else if (originalDoc?.parent) {
      parentSlug = "";
      const parent = await req.payload.findByID({
        collection: "pages",
        id: originalDoc?.parent,
      });
      if (parent.slug) {
        const parentSlugToReplace = parent.slug.replace(sanitisedHierarchicalSegment, "");
        candidateValue = candidateValue?.replace(parentSlugToReplace, "/");
      }
    }
    candidateValue = candidateValue.replace(/^\/+/, "");
    let slug = `${sanitisedHierarchicalSegment}${parentSlug}${candidateValue}`;
    if (slug.endsWith("/") && slug !== "/") {
      slug = slug.replace(/\/+$/, "");
    }
    return slug;
  };
}
