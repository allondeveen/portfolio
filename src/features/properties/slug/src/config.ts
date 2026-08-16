import { type HierarchicalSegmentProps } from "./components/HierarchicalSegment";
import { crossDocumentValidation } from "./hooks/crossDocumentValidation";
import { prefixHierarchicalSegments } from "./hooks/prefixHierarchicalSegments";

import type { DocumentCollectionSlug } from "./types";
import type { Field } from "payload";

export const slug = (
  collection: DocumentCollectionSlug,
  hierarchicalSegment: string = "",
): Field => {
  let sanitisedHierarchicalSegment = hierarchicalSegment;
  if (!sanitisedHierarchicalSegment.startsWith("/")) {
    sanitisedHierarchicalSegment = "/" + sanitisedHierarchicalSegment;
  }
  if (!sanitisedHierarchicalSegment.endsWith("/")) {
    sanitisedHierarchicalSegment = sanitisedHierarchicalSegment + "/";
  }
  const props: HierarchicalSegmentProps = { hierarchicalSegment: sanitisedHierarchicalSegment };
  return {
    name: "slug",
    admin: {
      position: "sidebar",
      components: {
        Field: {
          clientProps: props,
          path: "@allondeveen-portfolio/slug-property/slugField",
          exportName: "SlugField",
        },
      },
    },
    type: "text",
    defaultValue: "",
    required: true,
    unique: true,
    hooks: {
      beforeChange: [
        prefixHierarchicalSegments(sanitisedHierarchicalSegment, collection),
        crossDocumentValidation,
      ],
    },
  };
};
