import { initTRPC } from "@trpc/server";

import { ACCESS_TOKEN_EXPIRED } from "../accessTokenAuthentication";

import type { TRPCContext } from "./context";

export const t = initTRPC.context<TRPCContext>().create({
  errorFormatter({ error, shape }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        authenticationFailure:
          error.code === "UNAUTHORIZED" && error.message === ACCESS_TOKEN_EXPIRED
            ? ACCESS_TOKEN_EXPIRED
            : null,
      },
    };
  },
});
