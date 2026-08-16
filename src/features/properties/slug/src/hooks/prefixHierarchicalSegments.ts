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
    let parentSlug = "";
    if (originalDoc?.parent) {
      const parent = await req.payload.findByID({
        collection: "pages",
        id: originalDoc.parent,
      });
      if (parent.slug) {
        parentSlug = parent.slug;
        parentSlug = parentSlug.replace(sanitisedHierarchicalSegment, "");
        parentSlug = parentSlug.replace(/^\/+/, "");
        parentSlug = parentSlug.replace(/\/$/, "");
        if (parentSlug == "/") {
          parentSlug = "";
        }
      }
    }
    let candidateValue = value?.replace(sanitisedHierarchicalSegment, "/") ?? "";
    if (parentSlug !== "") {
      candidateValue = candidateValue?.replace(`/${parentSlug}`, "") ?? "";
    }
    if (data?.parent) {
      const parent = await req.payload.findByID({
        collection: "pages",
        id: data?.parent,
      });
      if (parent.slug) {
        let candidateParentSlug = parent.slug;
        candidateParentSlug = candidateParentSlug.replace(sanitisedHierarchicalSegment, "");
        candidateParentSlug = candidateParentSlug.replace(/^\/+/, "");
        candidateParentSlug = candidateParentSlug.replace(/\/$/, "");
        if (candidateParentSlug == "/") {
          candidateParentSlug = "";
        }
        parentSlug = candidateParentSlug;
      }
    } else {
      parentSlug = "";
    }
    let slug = `${sanitisedHierarchicalSegment}${parentSlug}${candidateValue}`;
    if (slug.endsWith("/") && slug !== "/") {
      slug = slug.replace(/\/+$/, "");
    }
    return slug;
  };
}
