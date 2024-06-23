import { createRootRoute, Outlet } from "@tanstack/react-router";
import { lazy } from "react";
import Header from "../components/Header";

const TanStackRouterDevtools = lazy(() =>
  import("@tanstack/router-devtools").then((module) => ({
    default: module.TanStackRouterDevtools,
  }))
);

export const Route = createRootRoute({
  component: () => (
    <div className="grid grid-rows-[auto_1fr] h-[100vh] overflow-hidden">
      <Header />
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});
