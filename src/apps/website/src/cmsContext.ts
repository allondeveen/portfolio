import { requestAccessToken } from "@allondeveen-portfolio/client-credentials-flow/client";
import { createTRPCClient, type TRPCClient } from "@allondeveen-portfolio/trpc/client";
import { httpLink } from "@trpc/client";
import { createContext } from "react-router";

import type { PublicDocumentsRouter } from "@allondeveen-portfolio/public-documents/trpc-server";

type CMSClient = TRPCClient<PublicDocumentsRouter>;

const CMS_SCOPE = "website-downstream";

export const cmsContext = createContext<CMSClient>();

export async function createCMSClient(env: Env, signal: AbortSignal): Promise<CMSClient> {
  const fetchCMS = (request: Request) => env.CMS.fetch(request);

  const accessToken = await requestAccessToken({
    tokenEndpoint: new URL("/oauth/token/", env.CMS_URL).toString(),
    clientId: env.OAUTH_CLIENT_ID,
    clientSecret: env.OAUTH_CLIENT_SECRET,
    scope: CMS_SCOPE,
    fetchRequest: fetchCMS,
    signal,
  });

  return createTRPCClient<PublicDocumentsRouter>({
    links: [
      httpLink({
        url: new URL("/trpc", env.CMS_URL),
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        fetch(input, init) {
          return env.CMS.fetch(new Request(input, init));
        },
      }),
    ],
  });
}
