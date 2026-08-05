import { cloudflare } from "@cloudflare/vite-plugin";
import { reactRouter } from "@react-router/dev/vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { defineConfig, loadEnv, type Plugin } from "vite";

function removeVanillaExtractExternals(): Plugin {
  return {
    name: "remove-vanilla-extract-externals",

    configResolved(config) {
      const ssrEnvironment = config.environments.ssr;

      if (!ssrEnvironment) {
        return;
      }

      ssrEnvironment.resolve.external = [];
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const port = parseInt(env.PORT) || 5173;
  return {
    plugins: [
      vanillaExtractPlugin(),
      removeVanillaExtractExternals(),
      cloudflare({ viteEnvironment: { name: "ssr" } }),
      reactRouter(),
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
