/* global process */
import { spawnSync } from "node:child_process";

const port = process.env.PORT ?? "3000";
const env = process.env.CLOUDFLARE_ENV ?? "development";

spawnSync("node", ["assets.mjs", "-b"], { stdio: "inherit", shell: true });

spawnSync("opennextjs-cloudflare", ["build"], { stdio: "inherit", shell: true });

let previewArgs = ["-e", ".dev.vars", "opennextjs-cloudflare", "preview"];
if (env !== "development") {
  previewArgs = [...previewArgs, `--env=${env}`];
}
previewArgs = [...previewArgs, "--", `--port=${port}`, "--persist-to=../../../.wrangler/state"];

spawnSync("dotenv", previewArgs, {
  stdio: "inherit",
  shell: true,
});
