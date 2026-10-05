import { LexicalTextComponent } from "@allondeveen-portfolio/lexical-text/website";
import { type TextParagraph } from "@allondeveen-portfolio/lexical-text/website/data";
import { buttonVariants, Icon } from "@allondeveen-portfolio/ui";
import clsx from "clsx";

import type { Icon as IconProps } from "./data";

import "./style.css";

export function IconComponent({ variant, icon, title }: IconProps) {
  let renderTitle = title;
  if (renderTitle && renderTitle.paragraphs.length > 1) {
    renderTitle = { ...renderTitle, paragraphs: [renderTitle.paragraphs.at(0) as TextParagraph] };
  }
  const className = clsx("icon", buttonVariants[variant]);
  return (
    <span className={className}>
      <Icon name={icon} className="icon-figure" />
      {renderTitle && (
        <LexicalTextComponent
          as="span"
          text={renderTitle}
          className={clsx("tooltip", buttonVariants[variant])}
        />
      )}
    </span>
  );
}
