import { backgroundVariants } from "@allondeveen-portfolio/background-variant-property/website";
import clsx from "clsx";

import type { CallToAction } from "./data";
import type { PropsWithChildren } from "react";

import "./style.css";

export type CallToActionBlockProps = PropsWithChildren<CallToAction>;

export function CallToActionBlock({ variant, children }: CallToActionBlockProps) {
  return (
    <section
      className={clsx(
        "call-to-action",
        "block",
        "inline",
        variant !== "default" ? backgroundVariants[variant] : "",
      )}
    >
      <div className="call-to-action__content container">{children}</div>
    </section>
  );
}
