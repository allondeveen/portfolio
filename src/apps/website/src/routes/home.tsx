import { Document, publicDocumentLoader } from "@allondeveen-portfolio/public-documents/website";

import { cmsContext } from "../cmsContext";

import type { Route } from "./+types/home";

export function loader({ context }: Route.LoaderArgs) {
  return publicDocumentLoader(context.get(cmsContext), "/");
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <Document {...loaderData} />;
}
