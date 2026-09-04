"use client";

import { useForm, useFormFields, useOperation } from "@payloadcms/ui";
import { slugify } from "payload/shared";
import React, { useEffect, useRef } from "react";

export type SyncSlugFromNameProps = {
  slugPath?: string;
  namePath?: string;
};

export function SyncSlugFromName({
  slugPath = "slug",
  namePath = "name",
}: SyncSlugFromNameProps): React.ReactNode {
  const { dispatchFields, setModified } = useForm();
  const operation = useOperation();
  const slug = useFormFields(([fields]) => fields[slugPath]?.value);
  const name = useFormFields(([fields]) => fields[namePath]?.value);
  // Tracks the previous generated slug to differantiate between auto-generated slugs
  // and manually edited slugs. Manually edited slugs will be left alone.
  const previousGeneratedSlug = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (operation !== "create" || typeof name !== "string" || name.length === 0) {
      return;
    }

    const generatedSlug = slugify(name);

    if (!generatedSlug) {
      return;
    }

    const previousSlug = previousGeneratedSlug.current;
    const currentLeafSlug = typeof slug === "string" ? slug : "";
    const mayOverwrite =
      previousSlug === undefined ? currentLeafSlug.length === 0 : currentLeafSlug === previousSlug;

    if (mayOverwrite && slug !== generatedSlug) {
      dispatchFields({
        path: slugPath,
        type: "UPDATE",
        value: generatedSlug,
      });
      setModified(true);
    }

    previousGeneratedSlug.current = generatedSlug;
  }, [dispatchFields, operation, setModified, slug, slugPath, name]);

  return null;
}
