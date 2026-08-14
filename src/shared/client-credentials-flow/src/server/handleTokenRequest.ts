import { SignJWT } from "jose";

import { oauthError } from "./oauthError";
import { parseClientCredentials } from "./parseClientCredentials";

import type { OAuthEnv } from "./OAuthEnv";

const encoder = new TextEncoder();

const ACCESS_TOKEN_LIFETIME_SECONDS = 300;

export function handleTokenRequest(env: OAuthEnv, scope: string) {
  return async (request: Request): Promise<Response> => {
    if (request.method !== "POST") {
      return new Response(null, {
        status: 405,
        headers: {
          "Cache-Control": "no-store",
          Allow: "POST",
        },
      });
    }

    const contentType = request.headers.get("content-type");

    if (!contentType?.startsWith("application/x-www-form-urlencoded")) {
      return oauthError("invalid_request", 400);
    }

    const credentials = parseClientCredentials(request);

    if (!credentials) {
      return oauthError("invalid_client", 401);
    }

    if (
      credentials.clientId !== env.OAUTH_CLIENT_ID ||
      credentials.clientSecret !== env.OAUTH_CLIENT_SECRET
    ) {
      return oauthError("invalid_client", 401);
    }

    const body = await request.formData();

    if (body.get("grant_type") !== "client_credentials") {
      return oauthError("unsupported_grant_type", 400);
    }

    if (body.get("scope") !== scope) {
      return oauthError("invalid_scope", 400);
    }

    const now = Math.floor(Date.now() / 1000);

    const token = await new SignJWT({
      scope,
    })
      .setProtectedHeader({
        alg: "HS256",
        typ: "JWT",
      })
      .setIssuer(env.CMS_ORIGIN)
      .setAudience(`${env.CMS_ORIGIN}/trpc`)
      .setIssuedAt(now)
      .setExpirationTime(now + ACCESS_TOKEN_LIFETIME_SECONDS)
      .sign(encoder.encode(env.OAUTH_JWT_SIGNING_KEY));

    return Response.json(
      {
        access_token: token,
        token_type: "Bearer",
        expires_in: ACCESS_TOKEN_LIFETIME_SECONDS,
        scope,
      },
      {
        headers: {
          "Cache-Control": "no-store",
          Pragma: "no-cache",
        },
      },
    );
  };
}
