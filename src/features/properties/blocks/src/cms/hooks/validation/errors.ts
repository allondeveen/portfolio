import { ValidationError } from "payload";

export function validationError(path: string, message: string) {
  return new ValidationError({
    errors: [
      {
        path: path,
        label: message,
        message: message,
      },
    ],
  });
}

export function blocksValidationError(message: string) {
  return validationError("blocks", message);
}

export function childBlockValidationError(path: string, message: string, parents: string[] = []) {
  return validationError([...parents, path].join("."), message);
}
