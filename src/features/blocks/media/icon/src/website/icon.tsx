import { LexicalTextComponent } from "@allondeveen-portfolio/lexical-text/website";
import { type TextParagraph } from "@allondeveen-portfolio/lexical-text/website/data";
import { buttonVariants, Icon } from "@allondeveen-portfolio/ui";
import clsx from "clsx";

import type { Icon as IconProps } from "./data";

import "./style.css";

export function IconComponent({ id, variant, icon, title }: IconProps) {
  let renderTitle = title;
  if (renderTitle && renderTitle.paragraphs.length > 1) {
    renderTitle = { ...renderTitle, paragraphs: [renderTitle.paragraphs.at(0) as TextParagraph] };
  }
  const className = clsx("icon", buttonVariants[variant]);
  return (
    <span
      className={className}
      id={`icon-${id}`}
      tabIndex={renderTitle ? 0 : undefined}
      aria-describedby={renderTitle ? `icon-description-${id}` : undefined}
      style={{ anchorName: `--icon-${id}` }}
    >
      <Icon name={icon} className="icon-figure" />
      {renderTitle && (
        <LexicalTextComponent
          as="span"
          id={`icon-description-${id}`}
          text={renderTitle}
          className={clsx("tooltip", buttonVariants[variant])}
        />
      )}
    </span>
  );
}
