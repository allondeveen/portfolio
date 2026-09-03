import { requestAccessToken } from "@allondeveen-portfolio/client-credentials-flow/client";
import {
  ACCESS_TOKEN_EXPIRED,
  createTRPCClient,
  type TRPCClient,
} from "@allondeveen-portfolio/trpc/client";
import { httpLink, type Operation, retryLink } from "@trpc/client";
import { createContext } from "react-router";

import type { PublicDocumentsRouter } from "@allondeveen-portfolio/public-documents/trpc-server";

type CMSClient = TRPCClient<PublicDocumentsRouter>;

const CMS_SCOPE = "website-downstream";
const TOKEN_PROMISE_CONTEXT_KEY = "cmsAccessTokenPromise";

export const cmsContext = createContext<CMSClient>();

export function createCMSClient(env: Env, signal: AbortSignal): CMSClient {
  const fetchCMS = (request: Request) => env.CMS.fetch(request);
  let hasReplacedToken = false;
  let expiredTokenPromise: unknown;
  let tokenPromise: Promise<string> | undefined;

  function getToken() {
    tokenPromise ??= requestAccessToken({
      tokenEndpoint: new URL("/oauth/token/", env.CMS_URL).toString(),
      clientId: env.OAUTH_CLIENT_ID,
      clientSecret: env.OAUTH_CLIENT_SECRET,
      scope: CMS_SCOPE,
      fetchRequest: fetchCMS,
      signal,
    }).catch((error) => {
      tokenPromise = undefined;
      throw error;
    });

    return tokenPromise;
  }

  return createTRPCClient<PublicDocumentsRouter>({
    links: [
      retryLink<PublicDocumentsRouter>({
        retry({ attempts, error, op }) {
          if (attempts !== 1 || error.data?.authenticationFailure !== ACCESS_TOKEN_EXPIRED) {
            return false;
          }

          const attemptedTokenPromise = op.context[TOKEN_PROMISE_CONTEXT_KEY];

          if (!attemptedTokenPromise) {
            return false;
          }

          if (hasReplacedToken) {
            return attemptedTokenPromise === expiredTokenPromise;
          }

          hasReplacedToken = true;
          expiredTokenPromise = attemptedTokenPromise;

          if (tokenPromise === attemptedTokenPromise) {
            tokenPromise = undefined;
          }

          return true;
        },
      }),
      httpLink({
        url: new URL("/trpc", env.CMS_URL),
        async headers({ op }: { op: Operation }) {
          const currentTokenPromise = getToken();
          op.context[TOKEN_PROMISE_CONTEXT_KEY] = currentTokenPromise;

          return {
            Authorization: `Bearer ${await currentTokenPromise}`,
          };
        },
        fetch(input: URL | RequestInfo, init: RequestInit) {
          return env.CMS.fetch(new Request(input, init));
        },
      }),
    ],
  });
}
