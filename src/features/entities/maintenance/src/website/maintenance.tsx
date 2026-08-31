import { BlocksComponent } from "@allondeveen-portfolio/blocks-property/website";

import type { MaintenanceContent } from "./data";

import "./style.css";
import "./maintenance.css";

export type MaintenancePageProps = MaintenanceContent;

export function MaintenancePage({ header, blocks }: MaintenancePageProps) {
  return (
    <>
      {header !== undefined && (
        <header className="site_header container center vertical">
          <BlocksComponent blocks={header.blocks} />
        </header>
      )}
      <main className="maintenance-page container center vertical">
        <section className="maintenance-page__content">
          <BlocksComponent blocks={blocks} />
        </section>
      </main>
    </>
  );
}
