import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import type { Payload } from "payload";

export type TRPCContext = FetchCreateContextFnOptions & {
  payload: Payload;
};

export function createTRPCContext(
  options: FetchCreateContextFnOptions,
  payload: Payload,
): TRPCContext {
  return {
    ...options,
    payload,
  };
}
