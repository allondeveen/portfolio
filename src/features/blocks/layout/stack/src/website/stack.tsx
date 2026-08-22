import clsx from "clsx";

import type { Stack } from "./data";
import type { PropsWithChildren } from "react";

export type StackBlockProps = PropsWithChildren<Stack>;

export function StackBlock({ kind, children }: StackBlockProps) {
  return <div className={clsx(kind)}>{children}</div>;
}
