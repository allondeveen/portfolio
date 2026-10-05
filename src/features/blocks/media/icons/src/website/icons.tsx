import { LexicalTextComponent } from "@allondeveen-portfolio/lexical-text/website";
import { buttonVariants } from "@allondeveen-portfolio/ui";
import clsx from "clsx";

import "./style.css";

import type { Icons } from "./data";
import type { TextParagraph } from "@allondeveen-portfolio/lexical-text/website/data";
import type { PropsWithChildren } from "react";

export type IconsBlockProps = PropsWithChildren<Icons>;

export function IconsBlock({ children, tooltips }: IconsBlockProps) {
  return (
    <div className={clsx("icons-block")}>
      <div className="icons">{children}</div>
      {tooltips.map((tooltip) => {
        let renderTitle = tooltip.text;
        if (!renderTitle) return null;
        if (renderTitle.paragraphs.length > 1) {
          renderTitle = {
            ...renderTitle,
            paragraphs: [renderTitle.paragraphs.at(0) as TextParagraph],
          };
        }
        return (
          <LexicalTextComponent
            as="span"
            key={tooltip.id}
            id={`tooltip-${tooltip.id}`}
            aria-hidden="true"
            text={renderTitle}
            className={clsx("icon-tooltip", buttonVariants[tooltip.variant])}
            style={{ positionAnchor: `--icon-${tooltip.id}` }}
          />
        );
      })}
      <style>
        {tooltips
          .map(
            ({ id }) => `
        .icons-block:has(
          [id="icon-${id}"]:is(:hover, :focus-visible)
        ) [id="tooltip-${id}"] {
          opacity: 1;
        }
      `,
          )
          .join("")}
      </style>
    </div>
  );
}
