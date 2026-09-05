import { data } from "react-router";
import z from "zod";

import type { SetupRequirementResult } from "@allondeveen-portfolio/setup-requirements";

const EnvironmentSchema = z.object({
  OAUTH_CLIENT_ID: z.string().min(1),
  OAUTH_CLIENT_SECRET: z.string().min(1),
  CMS_URL: z.string().min(1),
  MEDIA_URL: z.string().min(1),
  ENVIRONMENT: z.string().min(1),
});

type Environment = z.infer<typeof EnvironmentSchema>;

const checkAttribute = <Key extends keyof Environment>(
  key: Key,
  label: string,
  env: Partial<Record<keyof Environment, unknown>>,
): SetupRequirementResult => {
  try {
    if (key in env) {
      const result = EnvironmentSchema.shape[key].safeParse(env[key]);
      if (result.success) {
        return {
          status: "complete",
        };
      }
    }
    return {
      status: "incomplete",
      missing: label,
    };
  } catch (e) {
    return {
      status: "error",
      error: `${e}`,
    };
  }
};

type WebsiteValidationResult =
  | {
      result: "valid";
    }
  | {
      result: "invalid";
      errors: string[];
    }
  | {
      result: "error";
      error: string;
    };

function validateWebsiteEnvironment(
  env: Partial<Record<keyof Environment, unknown>>,
): WebsiteValidationResult {
  const results = [
    checkAttribute("OAUTH_CLIENT_ID", "OAUTH_CLIENT_ID", env),
    checkAttribute("OAUTH_CLIENT_SECRET", "OAUTH_CLIENT_SECRET", env),
    checkAttribute("CMS_URL", "CMS_URL", env),
    checkAttribute("MEDIA_URL", "MEDIA_URL", env),
    checkAttribute("ENVIRONMENT", "ENVIRONMENT", env),
  ];
  const errors = results.filter((res) => res.status === "error");
  if (errors.length > 0) {
    return {
      result: "error",
      error: errors.at(0)?.error ?? "",
    };
  }
  const incompletes = results.filter((res) => res.status === "incomplete");
  if (incompletes.length > 0) {
    return {
      result: "invalid",
      errors: incompletes.map((res) => res.missing),
    };
  }
  return {
    result: "valid",
  };
}

export function loaderValidateWebsiteEnvironment(env: Partial<Record<keyof Environment, unknown>>) {
  const environmentValidationResult = validateWebsiteEnvironment(env);
  let errorResponse: string = "Internal server error";
  switch (environmentValidationResult.result) {
    case "error":
      if (env.ENVIRONMENT !== "production") {
        errorResponse = environmentValidationResult.error;
      }
      throw data(errorResponse, {
        status: 503,
        statusText: "Service Unavailable",
        headers: {
          "Cache-Control": "no-store",
        },
      });
    case "invalid":
      if (env.ENVIRONMENT !== "production") {
        errorResponse = `Missing configuration: ${environmentValidationResult.errors.join(", ")}`;
      }
      throw data(errorResponse, {
        status: 503,
        statusText: "Service Unavailable",
        headers: {
          "Cache-Control": "no-store",
        },
      });
  }
}
