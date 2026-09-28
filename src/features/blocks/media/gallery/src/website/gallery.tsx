import clsx from "clsx";

import { GalleryCarousel } from "./carousel";

import type { Gallery } from "./data";
import type { PropsWithChildren } from "react";

import "./style.css";

export type GalleryBlockProps = PropsWithChildren<Gallery>;

export function GalleryBlock({ kind, children, layout }: GalleryBlockProps) {
  if (layout === "carousel") {
    return <GalleryCarousel>{children}</GalleryCarousel>;
  }

  return (
    <div className={clsx(kind)} data-layout={layout}>
      {children}
    </div>
  );
}
