import {
  handleMaintenanceRequest,
  isMaintenanceRequest,
} from "@allondeveen-portfolio/maintenance-mode";
import { createRequestHandler } from "react-router";

const requestHandler = createRequestHandler(
  // eslint-disable-next-line
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE,
);

export default {
  async fetch(request, env) {
    const maintenanceEnabled = await isMaintenanceRequest(env);

    if (maintenanceEnabled) {
      return await handleMaintenanceRequest(request, env);
    }

    return requestHandler(request);
  },
} satisfies ExportedHandler<Env>;
