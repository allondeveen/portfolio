import { LexicalTextComponent } from "@allondeveen-portfolio/lexical-text/website";
import { type TextParagraph } from "@allondeveen-portfolio/lexical-text/website/data";
import clsx from "clsx";

import { labelClassName } from "./label.css";

import type { Label } from "./data";

import "./style.css";

export function LabelComponent({ variant, text }: Label) {
  let renderText = text;
  if (renderText.paragraphs.length > 1) {
    renderText = { ...renderText, paragraphs: [renderText.paragraphs.at(0) as TextParagraph] };
  }
  return (
    <LexicalTextComponent
      as="p"
      text={renderText}
      className={clsx("label", labelClassName[variant])}
    />
  );
}
