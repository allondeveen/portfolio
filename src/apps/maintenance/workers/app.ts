import {
  dispatchServiceRequest,
  handleMaintenanceRequest,
  isMaintenanceEnabled,
} from "@allondeveen-portfolio/maintenance-mode";
import { createRequestHandler } from "react-router";

const requestHandler = createRequestHandler(
  // eslint-disable-next-line
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE,
);

export default {
  async fetch(request, env) {
    if (await isMaintenanceEnabled(env)) {
      return handleMaintenanceRequest(request, env, requestHandler);
    }

    return dispatchServiceRequest(request, env);
  },
} satisfies ExportedHandler<Env>;
