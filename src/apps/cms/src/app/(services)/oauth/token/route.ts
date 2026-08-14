import { handleTokenRequest } from "@allondeveen-portfolio/client-credentials-flow/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

function tokenHandler(request: Request) {
  const { env } = getCloudflareContext();

  return handleTokenRequest(env, "website-downstream")(request);
}

export {
  tokenHandler as DELETE,
  tokenHandler as GET,
  tokenHandler as HEAD,
  tokenHandler as OPTIONS,
  tokenHandler as PATCH,
  tokenHandler as POST,
  tokenHandler as PUT,
};
