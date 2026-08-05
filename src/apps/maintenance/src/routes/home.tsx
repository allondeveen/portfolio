import { MaintenancePage } from "@allondeveen-portfolio/maintenance-page";

export function meta() {
  return [
    { title: "Maintenance page | Allon de Veen" },
    { name: "description", content: "Something great is being built. Try again later." },
  ];
}

export default function Home() {
  return <MaintenancePage />;
}
