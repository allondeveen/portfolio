import { Document, publicDocumentLoader } from "@allondeveen-portfolio/public-documents/website";
import { loaderValidateWebsiteEnvironment } from "@allondeveen-portfolio/website-environment-validation";
import { env } from "cloudflare:workers";

import { cmsContext } from "../cmsContext";

import type { Route } from "./+types/splat";

export function loader({ context, params }: Route.LoaderArgs) {
  loaderValidateWebsiteEnvironment(env);
  const { "*": slug } = params;

  return publicDocumentLoader(context.get(cmsContext), `/${slug}`);
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <Document {...loaderData} />;
}
