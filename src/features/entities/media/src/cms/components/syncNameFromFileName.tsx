"use client";

import { useForm, useFormFields, useOperation } from "@payloadcms/ui";
import { slugify } from "payload/shared";
import React, { useEffect, useRef } from "react";

export type SyncNameFromFileNameProps = {
  filePath?: string;
  namePath?: string;
};

function stripExtension(filename: string): string {
  const lastDot = filename.lastIndexOf(".");

  // Preserve extensionless and dotfiles such as ".gitignore"
  return lastDot > 0 ? filename.slice(0, lastDot) : filename;
}

export function SyncNameFromFileName({
  filePath = "file",
  namePath = "name",
}: SyncNameFromFileNameProps): React.ReactNode {
  const { dispatchFields, setModified } = useForm();
  const operation = useOperation();
  const name = useFormFields(([fields]) => fields[namePath]?.value);
  const file = useFormFields(([fields]) => fields[filePath]?.value);
  // Tracks the previous generated slug to differantiate between auto-generated slugs
  // and manually edited slugs. Manually edited slugs will be left alone.
  const previouslyGeneratedName = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (operation !== "create") {
      return;
    }

    const previousName = previouslyGeneratedName.current;

    if (!(file instanceof File) && previousName === undefined) {
      return;
    }

    const generatedName = file instanceof File ? slugify(stripExtension(file.name)) : "";

    if (typeof generatedName !== "string") {
      return;
    }
    const currentName = typeof name === "string" ? name : "";
    const mayOverwrite =
      previousName === undefined ? currentName.length === 0 : currentName === previousName;

    if (mayOverwrite && name !== generatedName) {
      dispatchFields({
        path: namePath,
        type: "UPDATE",
        value: generatedName,
      });
      setModified(true);

      previouslyGeneratedName.current = generatedName;
    }
  }, [dispatchFields, operation, setModified, name, namePath, file]);

  return null;
}
