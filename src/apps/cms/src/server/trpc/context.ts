import { createTRPCContext as createSharedTRPCContext } from "@allondeveen-portfolio/trpc/server";
import { getPayload } from "payload";

import config from "@payload-config";

import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export async function createTRPCContext(options: FetchCreateContextFnOptions) {
  const payload = await getPayload({
    config,
  });

  return createSharedTRPCContext(options, payload);
}
