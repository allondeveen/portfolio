import clsx from "clsx";
import { Link } from "react-router";

import { siteTitleColor } from "./siteTitle.css";

import type { SiteTitle } from "./data";
import type { ReactNode } from "react";

import "./style.css";

export type SiteTitleProps = SiteTitle;

export function SiteTitle({ siteTitle, kind, withLink }: SiteTitleProps) {
  let children: ReactNode = siteTitle;
  if (withLink) {
    children = <Link to="/">{children}</Link>;
  }
  return <p className={clsx(kind, siteTitleColor)}>{children}</p>;
}
