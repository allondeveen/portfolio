import type { Copyright } from "./data";

import "./style.css";

export type CopyrightProps = Copyright;

export function Copyright({ siteTitle, kind }: CopyrightProps) {
  const now = new Date();
  return (
    <p className={kind}>
      &copy; {now.getFullYear()} {siteTitle}
    </p>
  );
}
