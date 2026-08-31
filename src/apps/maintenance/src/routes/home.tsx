import {
  maintenanceContentLoader,
  MaintenancePage,
} from "@allondeveen-portfolio/maintenance-content/website";

import { cmsContext } from "../cmsContext";

import type { Route } from "./+types/home";

export function meta() {
  return [
    { title: "Maintenance page | Allon de Veen" },
    { name: "description", content: "Something great is being built. Try again later." },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  return maintenanceContentLoader(context.get(cmsContext));
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <MaintenancePage {...loaderData} />;
}
