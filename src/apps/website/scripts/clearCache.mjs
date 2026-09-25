import { spawnSync } from "node:child_process";
import console from "node:console";
import { randomUUID } from "node:crypto";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import process from "node:process";
import { fileURLToPath, URL } from "node:url";
import { parseArgs } from "node:util";

const usage = `Usage: pnpm cache:clear [--env development|staging|production] [--dry-run] <tag> [tag...]

Examples:
  pnpm cache:clear route:/about header
  pnpm cache:clear --env staging site-settings
  pnpm cache:clear --env production route:/ --dry-run

Uses the remote CACHE namespace in the website Wrangler configuration.
The environment defaults to CLOUDFLARE_ENV, or development when unset.
Pass tag names without the tag:v1: prefix. Tags are exact matches, not patterns.`;

try {
  const args = process.argv.slice(2);
  const { values, positionals: tags } = parseArgs({
    args: args[0] === "--" ? args.slice(1) : args,
    allowPositionals: true,
    options: {
      env: { type: "string", short: "e" },
      "dry-run": { type: "boolean" },
      help: { type: "boolean", short: "h" },
    },
  });

  if (values.help) {
    console.log(usage);
  } else {
    const environment = values.env ?? process.env.CLOUDFLARE_ENV ?? "development";
    if (!["development", "staging", "production"].includes(environment)) {
      throw new Error(`Unsupported environment: ${environment}`);
    }
    if (tags.length === 0) {
      throw new Error("Provide at least one cache tag.");
    }
    if (tags.some((tag) => !tag.trim() || tag.startsWith("tag:v1:"))) {
      throw new Error("Provide non-empty tag names without the tag:v1: prefix.");
    }

    const uniqueTags = [...new Set(tags)];
    console.log(
      `${values["dry-run"] ? "Would invalidate" : "Invalidating"} ${uniqueTags.length} cache tag(s) in remote ${environment}: ${uniqueTags.join(", ")}`,
    );

    if (!values["dry-run"]) {
      const require = createRequire(import.meta.url);
      const wrangler = resolve(
        dirname(require.resolve("wrangler/package.json")),
        require("wrangler/package.json").bin.wrangler,
      );
      const config = fileURLToPath(new URL("../wrangler.jsonc", import.meta.url));

      for (const tag of uniqueTags) {
        // Match deleteTags in the caching package: rotate versions, never delete them.
        const result = spawnSync(
          process.execPath,
          [
            wrangler,
            "kv",
            "key",
            "put",
            `tag:v1:${tag}`,
            randomUUID(),
            "--binding",
            "CACHE",
            "--config",
            config,
            "--env",
            environment === "development" ? "" : environment,
            "--remote",
          ],
          { cwd: fileURLToPath(new URL("../", import.meta.url)), stdio: "inherit" },
        );
        if (result.error) throw result.error;
        if (result.status !== 0) {
          throw new Error(`Failed to invalidate ${tag}. Earlier tags may already be invalidated.`);
        }
      }
      console.log("Cache tags invalidated. Dependent entries refresh on their next read.");
    }
  }
} catch (error) {
  console.error(error.message);
  console.error(`\n${usage}`);
  process.exitCode = 1;
}
