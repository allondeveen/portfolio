import { findByReference } from "../cms/queries/findByReference";

import type { MappingContextDependencies } from "./mappingContext";
import type { CollectionSlug, Payload } from "payload";

export function createDependencies(payload: Payload): MappingContextDependencies {
  return {
    async findPublicSource(reference) {
      const result = await findByReference({
        payload,
        collection: reference.collection as CollectionSlug,
        id: reference.id,
      });
      return {
        source: result,
        url: result?.slug,
      };
    },
  };
}
