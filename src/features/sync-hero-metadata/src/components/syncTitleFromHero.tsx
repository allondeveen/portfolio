"use client";

import { useForm, useFormFields } from "@payloadcms/ui";
import React, { useEffect, useRef } from "react";

import { findHeroHeading } from "../lib/findHeroHeading";

export type SyncHeroFromTitleProps = {
  titlePath?: string;
};

export function SyncTitleFromHero({
  titlePath = "title",
}: SyncHeroFromTitleProps): React.ReactNode {
  const { dispatchFields, setModified } = useForm();
  const title = useFormFields(([fields]) => fields[titlePath]?.value);
  const heroHeading = useFormFields(([fields]) => findHeroHeading(fields));
  const previousGeneratedTitle = useRef<string | undefined>(undefined);

  useEffect(() => {
    // The hero heading is the page's initial display title. Keep the top-level
    // title in sync while it is empty or still contains our previous value,
    // without reclaiming ownership after an editor changes it manually.
    if (!heroHeading) {
      return;
    }

    if (previousGeneratedTitle.current === undefined) {
      previousGeneratedTitle.current = heroHeading;
    }

    const mayOverwrite =
      typeof title !== "string" || title.length === 0 || title === previousGeneratedTitle.current;

    if (mayOverwrite && title !== heroHeading) {
      dispatchFields({
        path: titlePath,
        type: "UPDATE",
        value: heroHeading,
      });
      setModified(true);
    }

    previousGeneratedTitle.current = heroHeading;
  }, [dispatchFields, heroHeading, setModified, title, titlePath]);

  return null;
}
