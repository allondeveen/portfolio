type MaintenanceEnv = {
  RUNTIME_CONFIG: KVNamespace;
  ASSETS: Fetcher;
  CMS?: Fetcher;
  WEBSITE: Fetcher;
  CMS_HOST: string;
  WEBSITE_HOST: string;
  ENVIRONMENT: "development" | "staging" | "production";
  DIRECT_HOST?: string;
};

function isMaintenanceAccessedDirectly(request: Request, env: MaintenanceEnv) {
  if (env.ENVIRONMENT === "development" && env.DIRECT_HOST) {
    const url = new URL(request.url);
    return url.hostname === env.DIRECT_HOST;
  }
  return false;
}

export async function isMaintenanceEnabled(request: Request, env: MaintenanceEnv) {
  return (
    (await env.RUNTIME_CONFIG.get("maintenance-mode")) === "enabled" ||
    isMaintenanceAccessedDirectly(request, env)
  );
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

  if (assetResponse.status !== 404) {
    return assetResponse;
  }

  const response = await requestHandler(request);

  if (isMaintenanceAccessedDirectly(request, env)) {
    return response;
  }

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
