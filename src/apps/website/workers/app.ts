import { createRequestHandler } from "react-router";

import { handleMaintenanceRequest } from "./maintenance";

const requestHandler = createRequestHandler(
  // eslint-disable-next-line
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE,
);

export default {
  async fetch(request, env) {
    const maintenanceEnabled = (await env.RUNTIME_CONFIG.get("maintenance-mode")) === "enabled";

    if (maintenanceEnabled) {
      return await handleMaintenanceRequest(request, env);
    }

    return requestHandler(request);
  },
} satisfies ExportedHandler<Env>;
