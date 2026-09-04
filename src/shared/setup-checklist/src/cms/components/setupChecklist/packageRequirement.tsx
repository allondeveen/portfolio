import { SuccessIcon } from "@payloadcms/ui";
import clsx from "clsx";
import { slugify } from "payload/shared";

import type { CMSPackageRequirement } from "../../requirements";

export type PackageRequirementProps = CMSPackageRequirement;

export function PackageRequirement({ label, instruction, result }: PackageRequirementProps) {
  const slug = slugify(label);
  return (
    <li aria-label="Site title" className={clsx("requirement", result, slug)}>
      <p className="requirement__label">
        {label}
        {result === "complete" && <SuccessIcon />}
      </p>
      {instruction && result === "incomplete" && (
        <p className="requirement--instruction">{instruction}</p>
      )}
    </li>
  );
}
