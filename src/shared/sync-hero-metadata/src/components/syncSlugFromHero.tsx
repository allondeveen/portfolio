"use client";

import { getLeafSlug } from "@allondeveen-portfolio/leaf-slug";
import { useForm, useFormFields, useOperation } from "@payloadcms/ui";
import { slugify } from "payload/shared";
import React, { useEffect, useRef } from "react";

export type SyncSlugFromHeroProps = {
  slugPath?: string;
  titlePath?: string;
};

export function SyncSlugFromHero({
  slugPath = "slug",
  titlePath = "title",
}: SyncSlugFromHeroProps): React.ReactNode {
  const { dispatchFields, setModified } = useForm();
  const operation = useOperation();
  const slug = useFormFields(([fields]) => fields[slugPath]?.value);
  const title = useFormFields(([fields]) => fields[titlePath]?.value);
  // Tracks the previous generated slug to differantiate between auto-generated slugs
  // and manually edited slugs. Manually edited slugs will be left alone.
  const previousGeneratedSlug = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (operation !== "create" || typeof title !== "string" || title.length === 0) {
      return;
    }

    const generatedSlug = slugify(title);

    if (!generatedSlug) {
      return;
    }

    const previousSlug = previousGeneratedSlug.current;
    const currentLeafSlug = typeof slug === "string" ? getLeafSlug(slug) : "";
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
  }, [dispatchFields, operation, setModified, slug, slugPath, title]);

  return null;
}
