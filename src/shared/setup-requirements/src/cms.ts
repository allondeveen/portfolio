import type { SetupRequirementResult } from "./setupRequirementResult";
import type { PayloadRequest } from "payload";

export type CMSSetupRequirement = {
  label: string;
  instruction: string;
  check(req: PayloadRequest): Promise<SetupRequirementResult>;
};

export type CMSSetupRequirements = {
  label: string;
  requirements: CMSSetupRequirement[];
};
