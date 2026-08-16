import type * as z from "zod";

export type RelationshipDepth = 0 | 1 | 2;

export type PublicReference = {
  collection: string;
  id: string;
};

export type ResolvePublicResult<Source> =
  | {
      status: "resolved";
      source: Source;
      url: string;
      context: MappingContext;
    }
  | { status: "unavailable" }
  | { status: "invalid-source" }
  | { status: "maximum-depth-reached" };

export type MappingContext = {
  readonly relationshipDepth: RelationshipDepth;

  resolvePublic<Schema extends z.ZodType>(
    reference: PublicReference,
    schema: Schema,
  ): Promise<ResolvePublicResult<z.output<Schema>>>;
};

export type Adapter<Source, Result, Context extends MappingContext = MappingContext> = (
  source: Source,
  context: Context,
) => Result | Promise<Result>;

type AnyAdapter = (...args: never[]) => unknown;

export type RecursiveAdapter<
  Source,
  Result,
  Recurse extends AnyAdapter,
  Context extends MappingContext = MappingContext,
> = (source: Source, context: Context, recurse: Recurse) => Result | Promise<Result>;
