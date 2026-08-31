import type { GlobalAfterChangeHook } from "payload";

const localBuildHookURL = "http://localhost:5174/__maintenance/rebuild";

function getBuildHookURL() {
  return (
    process.env.MAINTENANCE_BUILD_HOOK_URL ??
    (process.env.NODE_ENV === "production" ? undefined : localBuildHookURL)
  );
}

export const triggerMaintenanceBuild: GlobalAfterChangeHook = async ({ req }) => {
  const url = getBuildHookURL();

  if (!url) {
    return;
  }

  const ref = process.env.MAINTENANCE_BUILD_REF;
  const token = process.env.MAINTENANCE_BUILD_HOOK_TOKEN;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
        "User-Agent": "portfolio-cms",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(token ? { "X-GitHub-Api-Version": "2026-03-10" } : {}),
      },
      body: JSON.stringify(ref ? { ref } : { global: "maintenance" }),
    });

    if (!response.ok) {
      throw new Error(`The build hook returned ${response.status} ${response.statusText}`);
    }

    req.payload.logger.info("Triggered a maintenance page rebuild.");
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    req.payload.logger.warn(`Unable to trigger the maintenance page rebuild: ${message}`);
  }
};
