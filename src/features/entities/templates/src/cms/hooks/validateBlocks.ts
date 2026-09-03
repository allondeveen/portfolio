import { type Data, documentValidation } from "@allondeveen-portfolio/blocks-property/cms";
import { type FieldHook, type TypeWithID } from "payload";

export const validateBlocks: FieldHook<Data & TypeWithID> = ({ value, data }) => {
  const result = documentValidation(data as Data);

  if (result._tag === "Left") {
    throw result.left;
  }

  return value;
};
