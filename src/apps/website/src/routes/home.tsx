import { Document, publicDocumentLoader } from "@allondeveen-portfolio/public-documents/website";
import { loaderValidateWebsiteEnvironment } from "@allondeveen-portfolio/website-environment-validation";
import { env } from "cloudflare:workers";

import { cmsContext } from "../cmsContext";

import type { Route } from "./+types/home";

export function loader({ context }: Route.LoaderArgs) {
  loaderValidateWebsiteEnvironment(env);
  return publicDocumentLoader(context.get(cmsContext), "/");
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <Document {...loaderData} />;
}
