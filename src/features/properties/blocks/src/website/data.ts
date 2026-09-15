import * as z from "zod";

import { type AnyBlock, AnyBlockSchema } from "./collect";

export type Block = {
  block: AnyBlock;
  blocks?: Block[];
};

export const BlockSchema: z.ZodType<Block> = z.lazy(() =>
  z.object({
    block: AnyBlockSchema,
    blocks: z.array(BlockSchema).optional(),
  }),
);
