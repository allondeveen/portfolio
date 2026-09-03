import { type Either, flatMap, left, right } from "fp-ts/lib/Either";
import z from "zod";

import { type Data } from "./dataIsDefined";
import { blocksValidationError } from "./errors";

import type { ValidationError } from "payload";

export const DocumentWithBlocksSchema = z.object({
  blocks: z.array(z.record(z.string(), z.any())).min(1),
});

export type DocumentWithBlocks = z.infer<typeof DocumentWithBlocksSchema>;

export function atLeastOneBlock(
  result: Either<ValidationError, Data>,
): Either<ValidationError, DocumentWithBlocks> {
  return flatMap((data) => {
    const result = DocumentWithBlocksSchema.safeParse(data);
    if (!result.success) {
      return left(blocksValidationError("Document must have at least one block."));
    }
    return right(result.data as DocumentWithBlocks);
  })(result);
}
