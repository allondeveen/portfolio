import { LexicalTextComponent } from "@allondeveen-portfolio/lexical-text/website";
import { type TextParagraph } from "@allondeveen-portfolio/lexical-text/website/data";

import type { RichText } from "./data";

export function RichTextComponent({ text }: RichText) {
  let renderText = text;
  if (renderText.paragraphs.length > 1) {
    renderText = { ...renderText, paragraphs: [renderText.paragraphs.at(0) as TextParagraph] };
  }
  return <LexicalTextComponent as="p" text={renderText} className="rich-text" />;
}
