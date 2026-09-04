import clsx from "clsx";

import { SetupChecklistClient } from "./client";
import { checkCMSPackageRequirements, type CMSPackageRequirements } from "../../requirements";

import type { WidgetServerProps } from "payload";

export async function SetupChecklist({ req }: WidgetServerProps) {
  const result = await checkCMSPackageRequirements(req);
  const label =
    result.status === "complete"
      ? "CMS is ready to be used."
      : result.status === "incomplete"
        ? "The following things have to be setup before the CMS is usable."
        : "Something went wrong";
  let packageRequirements: CMSPackageRequirements[] = [];
  if (
    result.status === "incomplete" ||
    (result.status === "complete" && result.requirements && result.requirements.length > 0)
  ) {
    packageRequirements = [...(result.requirements || [])];
  }
  return (
    <section className={clsx("setup-checklist", result.status)}>
      <p className="setup-checklist__label">{label}</p>
      {result.status !== "error" && (
        <SetupChecklistClient result={result.status} currentRequirements={packageRequirements} />
      )}
    </section>
  );
}
