import { BlocksComponent } from "@allondeveen-portfolio/blocks-property/website";
import clsx from "clsx";

import type { Template } from "@allondeveen-portfolio/templates/website/data";

import "./style.css";

export type HeaderProps = Template;

export function Header(header: HeaderProps) {
  return (
    <header className={clsx("site_header", "center", "vertical")}>
      <BlocksComponent blocks={header.blocks} />
    </header>
  );
}
