import {
  dispatchServiceRequest,
  handleMaintenanceRequest,
  isMaintenanceEnabled,
  isServiceRequest,
} from "@allondeveen-portfolio/maintenance-mode";
import { createRequestHandler, RouterContextProvider } from "react-router";

import { cmsContext, createCMSClient } from "../src/cmsContext";

const requestHandler = createRequestHandler(
  // eslint-disable-next-line
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE,
);

const isBuild = import.meta.env.MODE === "production";

export default {
  async fetch(request, env) {
    const context = new RouterContextProvider();

    context.set(cmsContext, createCMSClient(env, request.signal));

    if (isBuild && !isServiceRequest(request, env)) {
      return requestHandler(request, context);
    }

    if (await isMaintenanceEnabled(request, env)) {
      return handleMaintenanceRequest(request, env, (req) => {
        if (import.meta.env.DEV) {
          return requestHandler(req, context);
        }
        const url = new URL(req.url);
        url.pathname = "/index.html";

        return env.ASSETS.fetch(new Request(url, req));
      });
    }

    return dispatchServiceRequest(request, env);
  },
} satisfies ExportedHandler<Env>;
