export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);

    const key = decodeURIComponent(url.pathname.replace(/^\/+/, ""));

    const asset = await env.R2.get(key);

    if (!asset) {
      return new Response("Not found", {
        status: 404,
      });
    }

    const headers = new Headers();

    asset.writeHttpMetadata(headers);
    headers.set("etag", asset.httpEtag);

    return new Response(asset.body, {
      headers,
    });
  },
} satisfies ExportedHandler<Env>;
