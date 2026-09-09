import { type Either, left, right } from "fp-ts/lib/Either";
import { type JsonObject, ValidationError } from "payload";

export type Data = JsonObject;

export function dataIsDefined(data: Data): Either<ValidationError, Data> {
  if (!data) {
    return left(
      new ValidationError({
        errors: [
          {
            path: "data undefined",
            message: "Data is undefined",
          },
        ],
      }),
    );
  }
  return right(data);
}
