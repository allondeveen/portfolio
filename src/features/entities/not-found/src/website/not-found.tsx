import { BlocksComponent } from "@allondeveen-portfolio/blocks-property/website";
import { Footer } from "@allondeveen-portfolio/footer/website";
import { Header } from "@allondeveen-portfolio/header/website";

import type { NotFoundContent } from "./data";

export type NotFoundPageProps = NotFoundContent;

export function NotFoundPage({ siteTitle, header, blocks, footer }: NotFoundPageProps) {
  return (
    <>
      <title>{`Not Found | ${siteTitle}`}</title>
      <Header {...header} />
      <main>
        <section className="not-found">
          <BlocksComponent blocks={blocks} />
        </section>
      </main>
      <Footer {...footer} />
    </>
  );
}
