import { ExternalLink } from "@allondeveen-portfolio/ui";
import { type ComponentPropsWithoutRef, type ElementType, Fragment, type ReactNode } from "react";
import { Link } from "react-router";

import type { InlineTextElement, LexicalText } from "./data";

export type LexicalTextComponentProps<Element extends ElementType> = {
  as: Element;
  text: LexicalText;
} & Omit<ComponentPropsWithoutRef<Element>, "as" | "children" | "text">;

function renderTextElement(element: InlineTextElement): ReactNode {
  if (element.kind === "linebreak") {
    return <br />;
  }

  const content = element.formats.reduce<ReactNode>((children, format) => {
    switch (format) {
      case "bold":
        return <strong>{children}</strong>;

      case "italic":
        return <em>{children}</em>;

      case "strikethrough":
        return <s>{children}</s>;

      case "underline":
        return <u>{children}</u>;

      case "code":
        return <code>{children}</code>;

      case "subscript":
        return <sub>{children}</sub>;

      case "superscript":
        return <sup>{children}</sup>;

      case "highlight":
        return <mark>{children}</mark>;
    }
  }, element.text);

  if (element.link?.url) {
    if (element.link.type == "custom") {
      return <ExternalLink href={element.link.url}>{content}</ExternalLink>;
    }
    return (
      <Link
        to={element.link.url}
        target={element.link.newTab ? "_blank" : undefined}
        rel={element.link.newTab ? "noreferrer noopener" : undefined}
      >
        {content}
      </Link>
    );
  }

  return content;
}

export function LexicalTextComponent<Element extends ElementType>({
  as: Paragraph,
  text,
  ...props
}: LexicalTextComponentProps<Element>) {
  const ParagraphComponent: ElementType = Paragraph;

  return (
    <>
      {text.paragraphs.map((paragraph, paragraphIndex) => (
        <ParagraphComponent key={paragraphIndex} {...props}>
          {paragraph.elements.map((element, elementIndex) => (
            <Fragment key={elementIndex}>{renderTextElement(element)}</Fragment>
          ))}
        </ParagraphComponent>
      ))}
    </>
  );
}
