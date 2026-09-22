import { LexicalTextComponent } from "@allondeveen-portfolio/lexical-text/website";
import { type TextParagraph } from "@allondeveen-portfolio/lexical-text/website/data";

import type { Quote } from "./data";

import "./style.css";
import "./quote.css";

export function QuoteComponent({ kind, quote, author }: Quote) {
  let quoteText = quote;
  if (quoteText.paragraphs.length > 1) {
    quoteText = { ...quoteText, paragraphs: [quoteText.paragraphs.at(0) as TextParagraph] };
  }
  let authorText = author;
  if (authorText && authorText.paragraphs.length > 1) {
    authorText = { ...authorText, paragraphs: [authorText.paragraphs.at(0) as TextParagraph] };
  }
  return (
    <div className={kind}>
      <blockquote>
        <LexicalTextComponent as="p" text={quoteText} />
      </blockquote>
      {authorText && (
        <p className="quote--author">
          -- <LexicalTextComponent as="span" text={authorText} />
        </p>
      )}
    </div>
  );
}
