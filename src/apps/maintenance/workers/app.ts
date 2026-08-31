import {
  dispatchServiceRequest,
  handleMaintenanceRequest,
  isMaintenanceEnabled,
} from "@allondeveen-portfolio/maintenance-mode";

export default {
  async fetch(request, env) {
    if (await isMaintenanceEnabled(request, env)) {
      return handleMaintenanceRequest(request, env, (req) => {
        const url = new URL(req.url);
        url.pathname = "/";
        url.search = "";

        return env.ASSETS.fetch(
          new Request(url, {
            headers: req.headers,
            method: req.method === "HEAD" ? "HEAD" : "GET",
          }),
        );
      });
    }

    return dispatchServiceRequest(request, env);
  },
} satisfies ExportedHandler<Env>;
