import type { DocumentCollectionSlug } from "../types";
import type { FieldHook, PayloadRequest, TypeWithID } from "payload";

type WithParentDoc = TypeWithID & {
  parent?: string;
};

async function getParentSlug(
  id: string | number,
  sanitisedHierarchicalSegment: string,
  collection: DocumentCollectionSlug,
  req: PayloadRequest,
) {
  const parent = await req.payload.findByID({
    collection,
    id,
  });
  let parentSlug = "";
  if ("slug" in parent && parent.slug) {
    parentSlug = parent.slug;
    parentSlug = parentSlug.replace(sanitisedHierarchicalSegment, "");
    parentSlug = parentSlug.replace(/^\/+/, "");
    parentSlug = parentSlug.replace(/\/$/, "");
    if (parentSlug == "/") {
      parentSlug = "";
    }
  }
  return parentSlug;
}

async function deconstructSlug(
  slug: string,
  sanitisedHierarchicalSegment: string,
  collection: DocumentCollectionSlug,
  originalDoc: WithParentDoc | undefined,
  req: PayloadRequest,
) {
  let parentSlug = "";
  if (originalDoc?.parent) {
    parentSlug = await getParentSlug(
      originalDoc.parent,
      sanitisedHierarchicalSegment,
      collection,
      req,
    );
  }
  let candidateValue = slug?.replace(sanitisedHierarchicalSegment, "/") ?? "";
  if (parentSlug !== "") {
    candidateValue = candidateValue?.replace(`/${parentSlug}`, "") ?? "";
  }
  candidateValue = candidateValue.replace(/^\//, "");
  return [parentSlug, candidateValue];
}

function constructSlug(
  sanitisedHierarchicalSegment: string,
  parentSlug: string,
  candidateValue: string,
) {
  let candidateParentSlug = parentSlug;
  if (candidateParentSlug.length > 0) {
    candidateParentSlug = candidateParentSlug + "/";
  }
  let slug = `${sanitisedHierarchicalSegment}${candidateParentSlug}${candidateValue}`;
  if (slug.endsWith("/") && slug !== "/") {
    slug = slug.replace(/\/+$/, "");
  }
  return slug;
}

/**
 * Prefix the raw slug of the content with hierarchical segments and parent slug(s).
 * @param sanitisedHierarchicalSegment The configured, sanitised hierchical segments of the content type.
 * @returns The field hook that prefixes the slug with the hierarchical segments and the parent slug(s).
 */
export function prefixHierarchicalSegments(
  sanitisedHierarchicalSegment: string,
  collection: DocumentCollectionSlug,
): FieldHook<WithParentDoc, string> {
  return async ({ value, req, data, originalDoc }) => {
    const [currentParentSlug, candidateValue] = await deconstructSlug(
      value ?? "",
      sanitisedHierarchicalSegment,
      collection,
      originalDoc,
      req,
    );
    // eslint-disable-next-line no-useless-assignment
    let parentSlug = currentParentSlug;
    if (data?.parent) {
      parentSlug = await getParentSlug(data.parent, sanitisedHierarchicalSegment, collection, req);
    } else {
      parentSlug = "";
    }
    return constructSlug(sanitisedHierarchicalSegment, parentSlug, candidateValue);
  };
}
