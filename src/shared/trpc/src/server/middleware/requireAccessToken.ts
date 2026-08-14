import { TRPCError } from "@trpc/server";

import { ACCESS_TOKEN_EXPIRED } from "../../accessTokenAuthentication";
import { t } from "../init";

export const requireAccessToken = t.middleware(async ({ ctx, next }) => {
  const authorization = ctx.req.headers.get("Authorization");

  if (!authorization) {
    ctx.resHeaders.set("Cache-Control", "no-store");
    ctx.resHeaders.set("WWW-Authenticate", "Bearer");

    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Missing access token",
    });
  }

  const match = /^Bearer[\t ]+([^\t ]+)$/i.exec(authorization);

  if (!match) {
    ctx.resHeaders.set("Cache-Control", "no-store");
    ctx.resHeaders.set("WWW-Authenticate", 'Bearer error="invalid_token"');

    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Invalid access token",
    });
  }

  const { requiredScope, verifyAccessToken } = ctx.accessTokenAuthentication;
  const result = await verifyAccessToken(match[1], requiredScope);

  if (result.kind === "success") {
    return next();
  }

  ctx.resHeaders.set("Cache-Control", "no-store");

  if (result.kind === "insufficient_scope") {
    ctx.resHeaders.set(
      "WWW-Authenticate",
      `Bearer error="insufficient_scope", scope="${requiredScope}"`,
    );

    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Insufficient access token scope",
    });
  }

  ctx.resHeaders.set("WWW-Authenticate", 'Bearer error="invalid_token"');

  throw new TRPCError({
    code: "UNAUTHORIZED",
    message: result.kind === "expired" ? ACCESS_TOKEN_EXPIRED : "Invalid access token",
  });
});
