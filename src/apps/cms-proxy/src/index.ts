export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);
    url.protocol = "http:";
    url.hostname = "127.0.0.1";
    url.port = `${env.CMS_PORT}`;

    const headers = new Headers(request.headers);
    headers.set("Host", env.CMS_HOST);

    return fetch(url, {
      method: request.method,
      headers,
      body: request.body,
      redirect: "manual",
    });
  },
} satisfies ExportedHandler<Env>;
