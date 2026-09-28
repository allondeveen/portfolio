import { LexicalTextComponent } from "@allondeveen-portfolio/lexical-text/website";
import { type TextParagraph } from "@allondeveen-portfolio/lexical-text/website/data";
import { buttonVariants, ExternalLink, Icon } from "@allondeveen-portfolio/ui";
import clsx from "clsx";
import { Link } from "react-router";

import type { Button } from "./data";
import type { JSX } from "react";

import "./style.css";

export function ButtonComponent({ variant, label, externality, location, icon }: Button) {
  let renderLabel = label;
  if (renderLabel.paragraphs.length > 1) {
    renderLabel = { ...renderLabel, paragraphs: [renderLabel.paragraphs.at(0) as TextParagraph] };
  }
  const className = clsx("button", buttonVariants[variant]);
  const labelJSX = <LexicalTextComponent as="span" text={renderLabel} />;
  let iconJSX: JSX.Element | null = null;
  if (icon !== "none") {
    iconJSX = <Icon name={icon} />;
  }
  if (externality === "external") {
    return (
      <ExternalLink href={location} className={className}>
        {labelJSX}
        {iconJSX}
      </ExternalLink>
    );
  }
  return (
    <Link to={location} className={className}>
      {labelJSX}
      {iconJSX}
    </Link>
  );
}
