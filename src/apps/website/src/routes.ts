import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  // prevent collapse
  index("routes/home.tsx"),
  route("*", "routes/splat.tsx"),
] satisfies RouteConfig;
