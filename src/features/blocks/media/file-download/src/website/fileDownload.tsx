import { LexicalTextComponent } from "@allondeveen-portfolio/lexical-text/website";
import { buttonVariants } from "@allondeveen-portfolio/ui";
import clsx from "clsx";
import { ArrowDownToLine } from "lucide-react";

import type { FileDownload } from "./data";

import "./style.css";

export type FileDownloadProps = FileDownload;

export function FileDownloadComponent({ download, label, style, variant }: FileDownloadProps) {
  if (download === undefined || download === null) {
    return <></>;
  }
  let classes = ["file-download"];
  if (style === "button") {
    classes = [...classes, style, buttonVariants[variant]];
  }
  const displayLabel = label ? (
    <LexicalTextComponent as="span" text={label} />
  ) : (
    <span>{download.name}</span>
  );
  return (
    <a className={clsx(classes)} href={download.url} download={download.name}>
      {style === "button" && <ArrowDownToLine size={16} />}
      {displayLabel}
    </a>
  );
}
