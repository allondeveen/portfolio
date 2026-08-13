import type { DocumentResponse } from "../trpc-server";

import "./document.css";

export function Document(props: DocumentResponse) {
  return (
    <main className="document container center vertical">
      <section className="document__content">
        <h1 className="document__title">{props.hello}</h1>
      </section>
    </main>
  );
}
