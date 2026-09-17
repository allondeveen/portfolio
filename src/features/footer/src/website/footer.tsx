import { BlocksComponent } from "@allondeveen-portfolio/blocks-property/website";
import clsx from "clsx";

import type { Template } from "@allondeveen-portfolio/templates/website/data";

import "./style.css";

export type FooterProps = Template;

export function Footer(footer: FooterProps) {
  return (
    <footer className={clsx("site_footer", "center", "vertical")}>
      <BlocksComponent blocks={footer.blocks} />
    </footer>
  );
}
