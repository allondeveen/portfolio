"use client";

import { Button, useServerFunctions } from "@payloadcms/ui";
import { slugify } from "payload/shared";
import { useActionState } from "react";

import { PackageRequirements } from "./packageRequirements";

import type { CMSPackageRequirements, CMSPackagesRequirementsResult } from "../../requirements";

type RequirementsState = {
  error?: string;
  requirements?: CMSPackageRequirements[];
};

type SetupChecklistClientProps = {
  result: CMSPackagesRequirementsResult["status"];
  currentRequirements: CMSPackageRequirements[];
};

function Requirements({ requirements }: { requirements: CMSPackageRequirements[] }) {
  return requirements.map((packageRequirements, index) => (
    <PackageRequirements
      key={`${slugify(packageRequirements.label)}-${index}`}
      {...packageRequirements}
    />
  ));
}

export function SetupChecklistClient({ currentRequirements, result }: SetupChecklistClientProps) {
  const { serverFunction } = useServerFunctions();
  const [completedState, loadCompleted, isLoadingCompleted] = useActionState<
    RequirementsState,
    FormData
  >(async () => {
    const result = (await serverFunction({
      name: "check-cms-package-requirements",
      args: { selector: "complete" },
    })) as CMSPackagesRequirementsResult;

    if (result.status === "error") {
      return { error: result.error };
    }

    return { requirements: result.requirements ?? [] };
  }, {});
  const [remainingState, loadRemaining, isLoadingRemaining] = useActionState<
    RequirementsState,
    FormData
  >(async () => {
    const result = (await serverFunction({
      name: "check-cms-package-requirements",
      args: { selector: "remaining" },
    })) as CMSPackagesRequirementsResult;

    if (result.status === "error") {
      return { error: result.error };
    }

    return { requirements: result.requirements ?? [] };
  }, {});

  return (
    <div>
      {!completedState.requirements && (
        <form action={loadCompleted} className="setup-checklist__loader">
          <Button buttonStyle="subtle" disabled={isLoadingCompleted} size="small" type="submit">
            {isLoadingCompleted ? "Loading completed steps…" : "Show completed steps"}
          </Button>
        </form>
      )}
      {completedState.error && (
        <p className="setup-checklist__load-error" role="alert">
          {completedState.error}
        </p>
      )}

      <Requirements requirements={completedState.requirements ?? currentRequirements} />

      {result === "incomplete" && (
        <>
          {remainingState.requirements ? (
            <Requirements requirements={remainingState.requirements} />
          ) : (
            <form action={loadRemaining} className="setup-checklist__loader">
              <Button buttonStyle="subtle" disabled={isLoadingRemaining} size="small" type="submit">
                {isLoadingRemaining ? "Loading remaining steps…" : "Show remaining steps"}
              </Button>
            </form>
          )}
          {remainingState.error && (
            <p className="setup-checklist__load-error" role="alert">
              {remainingState.error}
            </p>
          )}
        </>
      )}
    </div>
  );
}
