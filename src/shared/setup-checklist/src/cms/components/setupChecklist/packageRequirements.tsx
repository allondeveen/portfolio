import { SuccessIcon } from "@payloadcms/ui";
import clsx from "clsx";
import { slugify } from "payload/shared";

import { PackageRequirement } from "./packageRequirement";

import type { CMSPackageRequirements } from "../../requirements";

export type PackageRequirementsProps = CMSPackageRequirements;

export function PackageRequirements({
  label,
  requirements,
  result,
  start = 1,
}: PackageRequirementsProps) {
  const slug = slugify(label);
  return (
    <section aria-label={label} className={clsx("package-requirements", result, slug)} role="group">
      <p className="package-requirements__label">
        {label}
        {result === "complete" && <SuccessIcon />}
      </p>
      <div>
        <ol start={start}>
          {requirements.map((requirement) => (
            <PackageRequirement key={slugify(requirement.label)} {...requirement} />
          ))}
        </ol>
      </div>
    </section>
  );
}
