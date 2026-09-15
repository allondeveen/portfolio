import clsx from "clsx";

import type { Container } from "./data";
import type { PropsWithChildren } from "react";

export type ContainerBlockProps = PropsWithChildren<Container>;

export function ContainerBlock({ kind, children }: ContainerBlockProps) {
  return <div className={clsx(kind)}>{children}</div>;
}
