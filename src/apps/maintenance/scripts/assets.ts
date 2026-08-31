import { cpSync, mkdirSync, readdirSync, watch } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import type { FSWatcher } from "node:fs";

const assetsDirectory = fileURLToPath(new URL("../assets/", import.meta.url));
const publicDirectory = fileURLToPath(new URL("../public/", import.meta.url));

export function copyAssets() {
  mkdirSync(publicDirectory, { recursive: true });

  for (const entry of readdirSync(assetsDirectory)) {
    cpSync(join(assetsDirectory, entry), join(publicDirectory, entry), {
      force: true,
      recursive: true,
    });
  }

  console.log("Assets copied.");
}

export function watchAssets(): FSWatcher {
  copyAssets();

  const watcher = watch(assetsDirectory, { recursive: true }, () => {
    console.log("Rebuilding assets...");
    copyAssets();
  });

  console.log("Watching assets...");
  return watcher;
}
