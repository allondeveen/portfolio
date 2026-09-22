import { LexicalTextComponent } from "@allondeveen-portfolio/lexical-text/website";
import { type TextParagraph } from "@allondeveen-portfolio/lexical-text/website/data";

import type { List } from "./data";
import type { CSSProperties } from "react";

import "./style.css";

type MarkerStyles = CSSProperties & {
  "--list-marker-type"?: string;
  "--list-marker-suffix"?: string;
  "--list-marker-image"?: string;
};

export function ListComponent({ type, listStyle, items }: List) {
  const ListTag = type === "ordered" ? "ol" : "ul";
  const markerType =
    listStyle === "default" ? (type === "ordered" ? "decimal" : "disc") : listStyle;
  const isBullet = ["disc", "circle", "square"].includes(markerType);
  const listStyles: MarkerStyles = {
    "--list-marker-type": markerType === "image" || markerType === "none" ? "disc" : markerType,
    "--list-marker-suffix": isBullet ? '""' : '"."',
  };

  return (
    <ListTag className="list" role="list" data-style={markerType} style={listStyles}>
      {items.map((item) => {
        let renderText = item.text;
        if (renderText.paragraphs.length > 1) {
          renderText = {
            ...renderText,
            paragraphs: [renderText.paragraphs.at(0) as TextParagraph],
          };
        }
        let style: MarkerStyles | undefined;
        if (listStyle === "image" && "image" in item) {
          style = {
            "--list-marker-image": `url(${JSON.stringify(item.image.url)})`,
          };
        }
        return <LexicalTextComponent as="li" text={renderText} key={item.order} style={style} />;
      })}
    </ListTag>
  );
}
