import { Document, publicDocumentLoader } from "@allondeveen-portfolio/public-documents/website";

import { cmsContext } from "../cmsContext";

import type { Route } from "./+types/splat";

export function loader({ context, params }: Route.LoaderArgs) {
  const { "*": slug } = params;

  return publicDocumentLoader(context.get(cmsContext), `/${slug}`);
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <Document {...loaderData} />;
}
