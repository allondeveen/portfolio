import type {
  MappingContext,
  PublicReference,
  RelationshipDepth,
  ResolvePublicResult,
} from "@allondeveen-portfolio/adapter/trpc-server";
import type z from "zod";

export type MappingContextDependencies = {
  findPublicSource(reference: PublicReference): Promise<{ source: unknown; url: string } | null>;
};

export function createMappingContext(dependencies: MappingContextDependencies): MappingContext {
  return createContextAtDepth(dependencies, 0);
}

function createContextAtDepth(
  dependencies: MappingContextDependencies,
  depth: RelationshipDepth,
): MappingContext {
  return {
    relationshipDepth: depth,

    async resolvePublic<Schema extends z.ZodType>(
      reference: PublicReference,
      schema: Schema,
    ): Promise<ResolvePublicResult<z.output<Schema>>> {
      if (depth >= 2) {
        return { status: "maximum-depth-reached" };
      }

      const resolved = await dependencies.findPublicSource(reference);

      if (!resolved) {
        return { status: "unavailable" };
      }

      const parsed = schema.safeParse(resolved.source);

      if (!parsed.success) {
        return { status: "invalid-source" };
      }

      const nextDepth = (depth + 1) as RelationshipDepth;

      return {
        status: "resolved",
        source: parsed.data,
        url: resolved.url,
        context: createContextAtDepth(dependencies, nextDepth),
      };
    },
  };
}
