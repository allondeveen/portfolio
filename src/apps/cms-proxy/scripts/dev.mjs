/* global process */
import { spawnSync } from "node:child_process";

const port = process.env.INSPECTOR_PORT ?? "9231";

let devArgs = ["dev", `--inspector-port=${port}`];

spawnSync("wrangler", devArgs, {
  stdio: "inherit",
  shell: true,
});
