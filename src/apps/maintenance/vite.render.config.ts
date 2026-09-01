import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { defineConfig } from "vite";

export default defineConfig({
  publicDir: false,
  plugins: [vanillaExtractPlugin({ identifiers: "short" })],
  build: {
    ssr: "./src/render.tsx",
    ssrEmitAssets: true,
    outDir: "./.generated/render",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "render.js",
      },
    },
  },
  ssr: {
    noExternal: true,
  },
  resolve: {
    tsconfigPaths: true,
  },
});
