import { BlocksComponent } from "@allondeveen-portfolio/blocks-property/website";
import { Footer } from "@allondeveen-portfolio/footer/website";
import { Header } from "@allondeveen-portfolio/header/website";
import { HeadingComponent } from "@allondeveen-portfolio/heading-block/website";
import { HeroComponent } from "@allondeveen-portfolio/hero-block/website";
import { RichTextComponent } from "@allondeveen-portfolio/rich-text-block/website";

import type { ErrorPage } from "./data";

export type ErrorPageProps = ErrorPage;

export function ErrorPage({ siteTitle, header, blocks, footer }: ErrorPageProps) {
  return (
    <>
      <title>{`Error page | ${siteTitle}`}</title>
      <Header {...header} />
      <main>
        <section className="error-page">
          <BlocksComponent blocks={blocks} />
        </section>
      </main>
      <Footer {...footer} />
    </>
  );
}

export type ErrorPageBackupProps = {
  message: string;
  details: string;
  stack: string | undefined;
};
export function ErrorPageBackup({ message, details, stack }: ErrorPageBackupProps) {
  const headingText = {
    kind: "lexicalText" as const,
    paragraphs: [
      {
        kind: "paragraph" as const,
        elements: [
          {
            kind: "text" as const,
            text: message,
            formats: [],
          },
        ],
      },
    ],
  };
  const richTextText = {
    kind: "lexicalText" as const,
    paragraphs: [
      {
        kind: "paragraph" as const,
        elements: [
          {
            kind: "text" as const,
            text: details,
            formats: [],
          },
        ],
      },
    ],
  };
  return (
    <>
      <title>{`Error page`}</title>
      <main>
        <section className="error-page">
          <HeroComponent id="error-page-hero" kind="hero" blocks={[]}>
            <HeadingComponent
              id="error-page-heading"
              kind="heading"
              size={1}
              variant="default"
              text={headingText}
            />
            <RichTextComponent id="error-page-message" kind="richText" text={richTextText} />
            {stack && (
              <pre>
                <code>{stack}</code>
              </pre>
            )}
          </HeroComponent>
        </section>
      </main>
    </>
  );
}
