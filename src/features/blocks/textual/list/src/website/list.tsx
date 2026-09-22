import { LexicalTextComponent } from "@allondeveen-portfolio/lexical-text/website";
import { type TextParagraph } from "@allondeveen-portfolio/lexical-text/website/data";
import clsx from "clsx";

import { listStyleClassName } from "./list.css";

import type { List } from "./data";
import type { HTMLAttributes } from "react";

import "./style.css";

export function ListComponent({ type, listStyle, items }: List) {
  const className = clsx("list");
  const ListTag = type === "ordered" ? "ol" : "ul";
  return (
    <ListTag className={className}>
      {items.map((item) => {
        let renderText = item.text;
        if (renderText.paragraphs.length > 1) {
          renderText = {
            ...renderText,
            paragraphs: [renderText.paragraphs.at(0) as TextParagraph],
          };
        }
        let style: HTMLAttributes<"li">["style"];
        if (listStyle === "image" && "image" in item) {
          style = {
            listStyleImage: `url(${JSON.stringify(item.image.url)})`,
          };
        }
        let styleClassName = "";
        if (listStyle !== "image" && listStyle !== "default") {
          styleClassName = listStyleClassName[listStyle];
        }
        return (
          <LexicalTextComponent
            as="li"
            text={renderText}
            key={item.order}
            style={style}
            className={clsx(styleClassName)}
          />
        );
      })}
    </ListTag>
  );
}
