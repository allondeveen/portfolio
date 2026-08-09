type MaintenanceEnv = {
  RUNTIME_CONFIG: KVNamespace;
  ASSETS: Fetcher;
  CMS?: Fetcher;
  WEBSITE: Fetcher;
  CMS_HOST: string;
  WEBSITE_HOST: string;
};

export async function isMaintenanceEnabled(env: MaintenanceEnv) {
  return (await env.RUNTIME_CONFIG.get("maintenance-mode")) === "enabled";
}

export async function dispatchServiceRequest(
  request: Request,
  env: MaintenanceEnv,
): Promise<Response> {
  const routes = new Map([[env.WEBSITE_HOST, env.WEBSITE]]);
  if (env.CMS) {
    routes.set(env.CMS_HOST, env.CMS);
  }
  const url = new URL(request.url);
  const hostname = url.hostname;
  const service = routes.get(hostname);
  if (!service) {
    return new Response("Not found", { status: 404 });
  }
  return service.fetch(request);
}

export async function handleMaintenanceRequest(
  request: Request,
  env: MaintenanceEnv,
  requestHandler: (_: Request) => Promise<Response>,
): Promise<Response> {
  const assetResponse = await env.ASSETS.fetch(request);

  if (assetResponse.status != 404) {
    return assetResponse;
  }

  const response = await requestHandler(request);

  const headers = new Headers(response.headers);

  headers.set("Cache-Control", "no-store");
  headers.set("Retry-After", "300");
  headers.set("X-Robots-Tag", "noindex");

  return new Response(response.body, {
    status: 503,
    statusText: "Service Unavailable",
    headers,
  });
}
