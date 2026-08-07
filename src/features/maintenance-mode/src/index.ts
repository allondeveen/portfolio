type MaintenanceEnv = {
  RUNTIME_CONFIG: KVNamespace;
  MAINTENANCE: Fetcher;
};

export async function isMaintenanceRequest(env: MaintenanceEnv) {
  return (await env.RUNTIME_CONFIG.get("maintenance-mode")) === "enabled";
}

export async function handleMaintenanceRequest(
  request: Request,
  env: MaintenanceEnv,
): Promise<Response> {
  const isDocument = isDocumentRequest(request);

  const maintenanceRequest = isDocument ? request : withoutConditionalHeaders(request);

  const response = await env.MAINTENANCE.fetch(maintenanceRequest);

  if (!isDocument) {
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

function isDocumentRequest(request: Request): boolean {
  return (
    request.headers.get("Sec-Fetch-Dest") === "document" ||
    request.headers.get("Accept")?.includes("text/html") === true
  );
}

function withoutConditionalHeaders(request: Request): Request {
  const headers = new Headers(request.headers);

  // Prevent a cached erroneous asset response from being reused through a 304.
  headers.delete("If-None-Match");
  headers.delete("If-Modified-Since");

  return new Request(request, { headers });
}
