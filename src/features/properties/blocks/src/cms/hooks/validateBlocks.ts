import { pipe } from "fp-ts/lib/function";
import { type FieldHook, type TypeWithID } from "payload";

import { type Data } from "./validation/dataIsDefined";
import { documentValidation } from "./validation/documentValidation";
import { heroValidation } from "./validation/hero/heroValidation";

export const validateBlocks: FieldHook<Data & TypeWithID> = ({ value, data }) => {
  const slug =
    data && "slug" in data && typeof data.slug === "string"
      ? data.slug.startsWith("/")
        ? data.slug
        : `/${data.slug}`
      : "";

  const result = pipe(data as Data, documentValidation, heroValidation(slug !== "/contact"));

  if (result._tag === "Left") {
    throw result.left;
  }

  return value;
};
