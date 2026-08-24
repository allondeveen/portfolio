import { BlocksComponent } from "@allondeveen-portfolio/blocks-property/website";
import { Header } from "@allondeveen-portfolio/header/website";
import clsx from "clsx";

import type { Document } from "./data";

import "./style.css";

export function Document({ kind, meta: { title, description }, blocks, header }: Document) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <Header {...header} />
      <main>
        <article className={clsx("document", kind)}>
          <BlocksComponent blocks={blocks} />
        </article>
      </main>
    </>
  );
}
