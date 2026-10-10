"use client";

import clsx from "clsx";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

import {
  codeContentBodyClassName,
  codeContentClassName,
  copyCodeButtonClassName,
  fileNameButtonClassName,
} from "./code.css";

import type { Code } from "./data";
import type { MouseEvent } from "react";

import "./style.css";

export function CodeComponent({ kind, files }: Code) {
  const first = files.find(() => true) as Code["files"][number];
  const [currentFileName, setCurrentFileName] = useState(first?.fileName);
  const [copied, setCopied] = useState(false);
  const onClick = (fileName: string) => (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCurrentFileName(fileName);
  };
  const current = files.find((file) => file.fileName === currentFileName) as Code["files"][number];
  const copy = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText(current.rawCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className={clsx(kind, "inline")}>
      {files.length > 1 && (
        <div className="code--header">
          <ul>
            {files.map((file) => {
              return (
                <li key={file.fileName} className="file-name">
                  <button
                    type="button"
                    aria-pressed={file.fileName === currentFileName}
                    onClick={onClick(file.fileName)}
                    className={clsx(
                      fileNameButtonClassName,
                      file.fileName === currentFileName && "active",
                    )}
                  >
                    {file.fileName}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <div className={clsx("code--content", codeContentClassName)}>
        <div className="code--content__header">
          <ul className="inline">
            <li className="code--content__header__language">{current.language}</li>
            <li className="code--content__header__copy-button">
              <button type="button" onClick={copy} className={copyCodeButtonClassName}>
                {copied ? <Check /> : <Copy />}
              </button>
            </li>
          </ul>
        </div>
        <div
          className={clsx("code--content__body", codeContentBodyClassName)}
          dangerouslySetInnerHTML={{ __html: current.code ?? "" }}
        />
      </div>
    </div>
  );
}
