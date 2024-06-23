import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => null,
  loader: () => {
    redirect({
      to: "/login",
      throw: true,
    });
  },
});
