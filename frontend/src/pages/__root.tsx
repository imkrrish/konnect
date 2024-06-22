import { createRootRoute, Outlet } from "@tanstack/react-router";
import { lazy } from "react";

const TanStackRouterDevtools = lazy(() =>
  import("@tanstack/router-devtools").then((module) => ({
    default: module.TanStackRouterDevtools,
  }))
);

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
