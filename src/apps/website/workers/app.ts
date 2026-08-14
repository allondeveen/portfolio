import { createRequestHandler, RouterContextProvider } from "react-router";

import { cmsContext, createCMSClient } from "../src/cmsContext";

const requestHandler = createRequestHandler(
  // eslint-disable-next-line
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE,
);

export default {
  async fetch(request, env) {
    const context = new RouterContextProvider();

    context.set(cmsContext, await createCMSClient(env, request.signal));

    return requestHandler(request, context);
  },
} satisfies ExportedHandler<Env>;
