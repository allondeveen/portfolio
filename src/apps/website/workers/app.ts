import { createRequestHandler, RouterContextProvider } from "react-router";

import { cmsContext, createCMSClient } from "../src/cmsContext";

const requestHandler = createRequestHandler(
  // eslint-disable-next-line
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE,
);

export default {
  fetch(request, env) {
    const context = new RouterContextProvider();

    context.set(cmsContext, createCMSClient(env, request.signal));

    return requestHandler(request, context);
  },
} satisfies ExportedHandler<Env>;
