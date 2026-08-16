import { BlocksComponent } from "@allondeveen-portfolio/blocks-property/website";

import type { Document } from "./data";
import "./document.css";

export function Document({ blocks, meta: { title, description } }: Document) {
  return (
    <main className="document">
      <title>{title}</title>
      <meta name="description" content={description} />
      <section className="document__content">
        <BlocksComponent blocks={blocks} />
      </section>
    </main>
  );
}
