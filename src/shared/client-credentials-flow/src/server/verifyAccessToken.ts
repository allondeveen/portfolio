import { errors, type JWTPayload, jwtVerify } from "jose";

import type { OAuthEnv } from "./OAuthEnv";

export type VerificationResult =
  | {
      kind: "expired" | "insufficient_scope" | "invalid";
      message: string;
    }
  | {
      kind: "success";
      data: JWTPayload;
    };

const encoder = new TextEncoder();
const ACCESS_TOKEN_LIFETIME_SECONDS = 300;

export async function verifyAccessToken(
  token: string,
  env: OAuthEnv,
  scope: string,
): Promise<VerificationResult> {
  let payload: JWTPayload;

  try {
    const result = await jwtVerify(token, encoder.encode(env.OAUTH_JWT_SIGNING_KEY), {
      algorithms: ["HS256"],
      issuer: env.CMS_ORIGIN,
      audience: `${env.CMS_ORIGIN}/trpc`,
      clockTolerance: 30,
      requiredClaims: ["iat", "exp", "scope"],
    });

    payload = result.payload;
  } catch (error) {
    if (error instanceof errors.JWTExpired) {
      return {
        kind: "expired",
        message: "Access token expired",
      };
    }

    if (error instanceof errors.JOSEError) {
      return {
        kind: "invalid",
        message: "Invalid access token",
      };
    }

    throw error;
  }

  const now = Math.floor(Date.now() / 1000);

  if (
    typeof payload.iat !== "number" ||
    typeof payload.exp !== "number" ||
    payload.iat > now + 30 ||
    payload.exp !== payload.iat + ACCESS_TOKEN_LIFETIME_SECONDS
  ) {
    return {
      kind: "invalid",
      message: "Invalid access token claims",
    };
  }

  if (payload.scope !== scope) {
    return {
      kind: "insufficient_scope",
      message: "Invalid access token scope",
    };
  }

  return {
    kind: "success",
    data: payload,
  };
}
