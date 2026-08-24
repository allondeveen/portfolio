import { BlocksComponent } from "@allondeveen-portfolio/blocks-property/website";
import clsx from "clsx";

import "./header.css";

import type { Template } from "@allondeveen-portfolio/templates/website/data";

import "./style.css";

export type HeaderProps = Template;

export function Header(header: HeaderProps) {
  return (
    <header className={clsx("header", "center", "vertical")}>
      <div className="container">
        <BlocksComponent blocks={header.blocks} />
      </div>
    </header>
  );
}
