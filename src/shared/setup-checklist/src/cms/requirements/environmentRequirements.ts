import { getCloudflareContext } from "@opennextjs/cloudflare";
import z from "zod";

import type { SetupRequirementResult } from "@allondeveen-portfolio/setup-requirements";
import type { CMSSetupRequirements } from "@allondeveen-portfolio/setup-requirements/cms";
import type { JsonObject } from "payload";

const EnvironmentSchema = z.object({
  OAUTH_CLIENT_ID: z.string().min(1),
  OAUTH_CLIENT_SECRET: z.string().min(1),
  OAUTH_JWT_SIGNING_KEY: z.string().min(1),
  PAYLOAD_SECRET: z.string().min(1),
  CMS_ORIGIN: z.string().min(1),
  FRONTEND_URL: z.string().min(1),
  MEDIA_URL: z.string().min(1),
  ENVIRONMENT: z.string().min(1),
  MAINTENANCE_BUILD_HOOK_TOKEN: z.string().min(1),
  MAINTENANCE_BUILD_HOOK_URL: z.string().min(1),
  MAINTENANCE_BUILD_REF: z.string().min(1),
});

type Environment = z.infer<typeof EnvironmentSchema>;

const checkAttribute =
  <Key extends keyof Environment>(key: Key, label: string) =>
  async (): Promise<SetupRequirementResult> => {
    try {
      const { env } = getCloudflareContext() as { env: JsonObject };
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

const checkAttributeIf = (predicate: (env: JsonObject) => boolean) => {
  return <Key extends keyof Environment>(key: Key, label: string) =>
    async (): Promise<SetupRequirementResult> => {
      const { env } = getCloudflareContext() as { env: JsonObject };
      if (predicate(env)) {
        return await checkAttribute(key, label)();
      }
      return {
        status: "complete",
      };
    };
};

function isNotDevelopment(env: JsonObject) {
  return (
    "ENVIRONMENT" in env && (env.ENVIRONMENT === "staging" || env.ENVIRONMENT === "production")
  );
}

export const environmentRequirements: CMSSetupRequirements = {
  label: "Configuration",
  requirements: [
    {
      label: "OAUTH_CLIENT_ID",
      instruction: "Add OAUTH_CLIENT_ID to the environment secrets.",
      check: checkAttribute("OAUTH_CLIENT_ID", "OAUTH_CLIENT_ID"),
    },
    {
      label: "OAUTH_CLIENT_SECRET",
      instruction: "Add OAUTH_CLIENT_SECRET to the environment secrets.",
      check: checkAttribute("OAUTH_CLIENT_SECRET", "OAUTH_CLIENT_SECRET"),
    },
    {
      label: "OAUTH_JWT_SIGNING_KEY",
      instruction: "Add OAUTH_JWT_SIGNING_KEY to the environment secrets.",
      check: checkAttribute("OAUTH_JWT_SIGNING_KEY", "OAUTH_JWT_SIGNING_KEY"),
    },
    {
      label: "PAYLOAD_SECRET",
      instruction: "Add PAYLOAD_SECRET to the environment secrets.",
      check: checkAttribute("PAYLOAD_SECRET", "PAYLOAD_SECRET"),
    },
    {
      label: "CMS_ORIGIN",
      instruction: "Add CMS_ORIGIN to the environment variables.",
      check: checkAttribute("CMS_ORIGIN", "CMS_ORIGIN"),
    },
    {
      label: "FRONTEND_URL",
      instruction: "Add FRONTEND_URL to the environment variables.",
      check: checkAttribute("FRONTEND_URL", "FRONTEND_URL"),
    },
    {
      label: "MEDIA_URL",
      instruction: "Add MEDIA_URL to the environment variables.",
      check: checkAttribute("MEDIA_URL", "MEDIA_URL"),
    },
    {
      label: "ENVIRONMENT",
      instruction: "Add ENVIRONMENT to the environment variables.",
      check: checkAttribute("ENVIRONMENT", "ENVIRONMENT"),
    },
    {
      label: "MAINTENANCE_BUILD_HOOK_TOKEN",
      instruction: "Add MAINTENANCE_BUILD_HOOK_TOKEN to the environment secrets.",
      check: checkAttributeIf(isNotDevelopment)(
        "MAINTENANCE_BUILD_HOOK_TOKEN",
        "MAINTENANCE_BUILD_HOOK_TOKEN",
      ),
    },
    {
      label: "MAINTENANCE_BUILD_HOOK_URL",
      instruction: "Add MAINTENANCE_BUILD_HOOK_URL to the environment variables.",
      check: checkAttributeIf(isNotDevelopment)(
        "MAINTENANCE_BUILD_HOOK_URL",
        "MAINTENANCE_BUILD_HOOK_URL",
      ),
    },
    {
      label: "MAINTENANCE_BUILD_REF",
      instruction: "Add MAINTENANCE_BUILD_REF to the environment variables.",
      check: checkAttributeIf(isNotDevelopment)("MAINTENANCE_BUILD_REF", "MAINTENANCE_BUILD_REF"),
    },
  ],
};
