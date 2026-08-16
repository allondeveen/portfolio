import type { CollectionSlug } from "payload";

export type DocumentCollectionSlug = Exclude<
  CollectionSlug,
  | "payload-kv"
  | "payload-jobs"
  | "payload-locked-documents"
  | "payload-preferences"
  | "payload-migrations"
  | "users"
  | "media"
>;
