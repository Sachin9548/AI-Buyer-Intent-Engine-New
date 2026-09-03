import { createFileRoute, redirect } from "@tanstack/react-router";

// Signup lives inside the login page (tab switcher on the AuthCard).
// This route just redirects so any existing /signup links keep working.
export const Route = createFileRoute("/signup")({
  beforeLoad: () => {
    throw redirect({ to: "/login", replace: true });
  },
  component: () => null,
});
