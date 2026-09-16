import { Outlet, createFileRoute } from "@tanstack/react-router";

import { Shell } from "@/components/cv/Shell";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <Shell>
      <Outlet />
    </Shell>
  );
}
