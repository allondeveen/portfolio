export type SetupRequirementResult =
  | {
      status: "complete";
    }
  | {
      status: "incomplete";
      missing: string;
    }
  | {
      status: "error";
      error: string;
    };
