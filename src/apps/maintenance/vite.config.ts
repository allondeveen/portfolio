import { cloudflare } from "@cloudflare/vite-plugin";
import { reactRouter } from "@react-router/dev/vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const port = parseInt(env.PORT) || 5173;
  return {
    plugins: [
      reactRouter(),
      cloudflare({ viteEnvironment: { name: "ssr" } }),
      vanillaExtractPlugin(),
    ],
    preview: {
      port,
      strictPort: true,
    },
    server: {
      port,
      strictPort: true,
      allowedHosts: ["maintenance-dev.allondeveen.com"],
    },
    resolve: {
      tsconfigPaths: true,
    },
  };
});
