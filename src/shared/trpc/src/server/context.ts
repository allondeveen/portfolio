import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import type { Payload } from "payload";

export type AccessTokenVerificationResult =
  | {
      kind: "expired" | "insufficient_scope" | "invalid";
      message: string;
    }
  | {
      kind: "success";
      data: unknown;
    };

export type AccessTokenAuthentication = {
  requiredScope: string;
  verifyAccessToken: (token: string, scope: string) => Promise<AccessTokenVerificationResult>;
};

export type TRPCContext = FetchCreateContextFnOptions & {
  accessTokenAuthentication: AccessTokenAuthentication;
  payload: Payload;
};

export function createTRPCContext(
  options: FetchCreateContextFnOptions,
  payload: Payload,
  accessTokenAuthentication: AccessTokenAuthentication,
): TRPCContext {
  return {
    ...options,
    accessTokenAuthentication,
    payload,
  };
}
