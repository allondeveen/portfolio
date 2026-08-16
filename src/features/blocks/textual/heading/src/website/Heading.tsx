import { LexicalTextComponent } from "@allondeveen-portfolio/lexical-text/website";
import { type TextParagraph } from "@allondeveen-portfolio/lexical-text/website/data";
import clsx from "clsx";

import { headingVariant } from "./Heading.css";

import type { Heading } from "./data";

export function HeadingComponent({ text, size, variant }: Heading) {
  let renderText = text;
  if (renderText.paragraphs.length > 1) {
    renderText = { ...renderText, paragraphs: [renderText.paragraphs.at(0) as TextParagraph] };
  }
  let element: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  switch (size) {
    case 1:
      element = "h1";
      break;
    case 2:
      element = "h2";
      break;
    case 3:
      element = "h3";
      break;
    case 4:
      element = "h4";
      break;
    case 5:
      element = "h5";
      break;
    case 6:
    default:
      element = "h6";
      break;
  }
  return (
    <LexicalTextComponent
      as={element}
      text={renderText}
      className={clsx(headingVariant[variant], "heading")}
    />
  );
}
