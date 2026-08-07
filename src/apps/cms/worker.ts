import {
  handleMaintenanceRequest,
  isMaintenanceRequest,
} from "@allondeveen-portfolio/maintenance-mode";

// eslint-disable-next-line import-x/no-duplicates
import handler from "./.open-next/worker.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars, import-x/no-duplicates
import { DOQueueHandler, DOShardedTagCache } from "./.open-next/worker.js";

const { fetch } = handler;

export default {
  async fetch(request, env, context) {
    const maintenanceEnabled = await isMaintenanceRequest(env);

    if (maintenanceEnabled) {
      return await handleMaintenanceRequest(request, env);
    }

    return fetch(request, env, context);
  },
} satisfies ExportedHandler<CloudflareEnv>;
