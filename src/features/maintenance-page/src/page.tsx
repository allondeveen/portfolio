import { ExternalLink, GithubIcon, LinkedinIcon } from "@allondeveen-portfolio/ui";
import "./style.css";
import clsx from "clsx";

import { maintenanceLink, maintenanceLinkIcon, secondaryBodyText } from "./page.css";

export function MaintenancePage() {
  return (
    <>
      <header className="site_header container center vertical">
        <p className="site_title">Allon de Veen</p>
      </header>
      <main className="maintenance-page container center vertical">
        <section className="maintenance-page__content">
          <h1 className="maintenance-page__title">Coming soon</h1>
          <p className={clsx("maintenance-page__description", secondaryBodyText)}>
            I am building something cool. Keep checking in to find out more.
          </p>
          <nav className="maintenance-page__links">
            <ul className="maintenance-page__links-list cluster">
              <li className="maintenance-page__links-item">
                <ExternalLink
                  href="https://github.com/allondeveen"
                  className={clsx("maintenance-page__links-item-link", "inline", maintenanceLink)}
                >
                  <GithubIcon className={maintenanceLinkIcon} /> Github
                </ExternalLink>
              </li>
              <li className="maintenance-page__links-item">
                <ExternalLink
                  href="https://www.linkedin.com/in/allon-de-veen/"
                  className={clsx("maintenance-page__links-item-link", "inline", maintenanceLink)}
                >
                  <LinkedinIcon className={maintenanceLinkIcon} /> LinkedIn
                </ExternalLink>
              </li>
            </ul>
          </nav>
        </section>
      </main>
    </>
  );
}
