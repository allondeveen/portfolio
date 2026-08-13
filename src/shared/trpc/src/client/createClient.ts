import {
  createTRPCClient as createBaseTRPCClient,
  type CreateTRPCClientOptions,
  type TRPCClient,
} from "@trpc/client";

import type { AnyTRPCRouter } from "@trpc/server";

export function createTRPCClient<TRouter extends AnyTRPCRouter>(
  options: CreateTRPCClientOptions<TRouter>,
): TRPCClient<TRouter> {
  return createBaseTRPCClient<TRouter>(options);
}
