import { BlocksComponent } from "@allondeveen-portfolio/blocks-property/website";
import { Header } from "@allondeveen-portfolio/header/website";
import clsx from "clsx";

import type { Document } from "./data";

import "./style.css";

export function Document({ kind, meta: { title, description }, blocks, header }: Document) {
  return (
    <main className={clsx("document", kind)}>
      <title>{title}</title>
      <meta name="description" content={description} />
      <Header {...header} />
      <section className="document__content">
        <BlocksComponent blocks={blocks} />
      </section>
    </main>
  );
}
