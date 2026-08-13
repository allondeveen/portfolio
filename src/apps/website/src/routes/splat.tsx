import { Document, publicDocumentLoader } from "@allondeveen-portfolio/public-documents/website";

import { cloudflareContext } from "../cloudflareContext";

import type { Route } from "./+types/splat";

export function loader({ context, params }: Route.LoaderArgs) {
  const { "*": slug } = params;
  const { env } = context.get(cloudflareContext);

  return publicDocumentLoader(env.CMS_URL, env.CMS, `/${slug}`);
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <Document {...loaderData} />;
}
