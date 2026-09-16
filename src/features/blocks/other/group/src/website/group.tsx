import clsx from "clsx";

import type { Group } from "./data";
import type { PropsWithChildren } from "react";

export type GroupBlockProps = PropsWithChildren<Group>;

export function GroupBlock({ kind, children }: GroupBlockProps) {
  return <div className={clsx(kind)}>{children}</div>;
}
