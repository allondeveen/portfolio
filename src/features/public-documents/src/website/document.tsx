import { BlocksComponent } from "@allondeveen-portfolio/blocks-property/website";
import clsx from "clsx";

import type { Document } from "./data";

export function Document({ kind, meta: { title, description }, blocks }: Document) {
  return (
    <main className={clsx("document", kind)}>
      <title>{title}</title>
      <meta name="description" content={description} />
      <section className="document__content">
        <BlocksComponent blocks={blocks} />
      </section>
    </main>
  );
}
