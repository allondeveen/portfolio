import { maintenanceRequirements } from "@allondeveen-portfolio/maintenance-content/cms";
import { menuRequirements } from "@allondeveen-portfolio/menu/cms";
import { siteSettingsRequirements } from "@allondeveen-portfolio/site-settings/cms";

import type { SetupRequirementResult } from "@allondeveen-portfolio/setup-requirements";
import type {
  CMSSetupRequirement,
  CMSSetupRequirements,
} from "@allondeveen-portfolio/setup-requirements/cms";
import type { PayloadRequest, ServerFunction } from "payload";

export const checkCMSPackageRequirementsServerFunctionName = "check-cms-package-requirements";

export type CMSPackageRequirement = Omit<CMSSetupRequirement, "check" | "instruction"> & {
  instruction?: CMSSetupRequirement["instruction"];
  result: Exclude<SetupRequirementResult["status"], "error">;
};

export type CMSPackageRequirements = Omit<CMSSetupRequirements, "requirements"> & {
  result: Exclude<SetupRequirementResult["status"], "error">;
  requirements: CMSPackageRequirement[];
  start?: number;
};

export type CMSPackagesRequirementsResult =
  | {
      status: "complete";
      requirements?: CMSPackageRequirements[];
    }
  | {
      status: "incomplete";
      requirements: CMSPackageRequirements[];
    }
  | {
      status: "error";
      error: string;
    };

export type CMSPackageRequirementsSelector =
  "all" | "complete" | "current" | "incomplete" | "remaining";

type CheckCMSPackageRequirementsServerFunctionArgs = {
  selector?: CMSPackageRequirementsSelector;
};

async function getResults(req: PayloadRequest): Promise<CMSPackagesRequirementsResult> {
  const allPackageRequirements = [
    //
    siteSettingsRequirements,
    menuRequirements,
    maintenanceRequirements,
  ];
  let results: CMSPackageRequirements[] = [];
  let start = 1;
  for (const packageRequirements of allPackageRequirements) {
    let packageRequirementResults: CMSPackageRequirement[] = [];
    for (const requirement of packageRequirements.requirements) {
      const result = await requirement.check(req);
      if (result.status === "error") {
        return {
          status: "error",
          error: result.error,
        };
      }
      packageRequirementResults = [
        ...packageRequirementResults,
        {
          label: requirement.label,
          instruction: requirement.instruction,
          result: result.status,
        },
      ];
    }
    const incomplete = packageRequirementResults
      .map((res) => res.result)
      .find((result) => result === "incomplete");
    if (incomplete) {
      results = [
        ...results,
        {
          result: "incomplete",
          label: packageRequirements.label,
          requirements: packageRequirementResults,
          start,
        },
      ];
    }
    results = [
      ...results,
      {
        result: "complete",
        label: packageRequirements.label,
        requirements: packageRequirementResults,
        start,
      },
    ];
    start += packageRequirements.requirements.length;
  }
  const incomplete = results.map((res) => res.result).find((result) => result === "incomplete");
  if (incomplete) {
    return {
      status: "incomplete",
      requirements: results,
    };
  }
  return {
    status: "complete",
    requirements: results,
  };
}

export async function checkCMSPackageRequirements(
  req: PayloadRequest,
  selector: CMSPackageRequirementsSelector = "current",
): Promise<CMSPackagesRequirementsResult> {
  const result = await getResults(req);
  if (result.status === "error") {
    return result;
  }
  if (result.status === "complete") {
    if (selector == "all" || selector === "complete") {
      return result;
    }
    return {
      ...result,
      requirements: undefined,
    };
  }
  if (selector === "all") {
    return result;
  }
  if (selector === "complete") {
    const currentGroupIndex = result.requirements.findIndex(
      (group) => group.result === "incomplete",
    );

    return {
      ...result,
      requirements: result.requirements.slice(
        0,
        currentGroupIndex === -1 ? result.requirements.length : currentGroupIndex + 1,
      ),
    };
  }
  let requirements = result.requirements
    .filter((group) => group.result === "incomplete")
    .map((group) => ({
      ...group,
      requirements: group.requirements.filter((requirement) => requirement.result === "incomplete"),
    }));
  if (selector === "current") {
    requirements = requirements.slice(0, 1);
  } else if (selector === "remaining") {
    requirements = requirements.slice(1);
  }
  return {
    ...result,
    requirements,
  };
}

export const checkCMSPackageRequirementsServerFunction: ServerFunction<
  CheckCMSPackageRequirementsServerFunctionArgs,
  Promise<CMSPackagesRequirementsResult>
> = ({ req, selector }) => checkCMSPackageRequirements(req, selector);
