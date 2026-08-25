/* global process */
import { spawnSync } from "node:child_process";

const inspectorPort = process.env.INSPECTOR_PORT ?? "9232";
const port = process.env.PORT ?? "8789";

let devArgs = [
  "dev",
  `--inspector-port=${inspectorPort}`,
  `--port=${port}`,
  "--persist-to=../../../.wrangler/state",
];

spawnSync("wrangler", devArgs, {
  stdio: "inherit",
  shell: true,
});
