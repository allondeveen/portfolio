import { verifyAccessToken as verifyOAuthAccessToken } from "@allondeveen-portfolio/client-credentials-flow/server";
import { createTRPCContext as createSharedTRPCContext } from "@allondeveen-portfolio/trpc/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getPayload } from "payload";

import config from "@payload-config";

import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export async function createTRPCContext(options: FetchCreateContextFnOptions) {
  const { env } = getCloudflareContext();
  const payload = await getPayload({
    config,
  });

  return createSharedTRPCContext(options, payload, {
    requiredScope: "website-downstream",
    verifyAccessToken(token, scope) {
      return verifyOAuthAccessToken(token, env, scope);
    },
  });
}
