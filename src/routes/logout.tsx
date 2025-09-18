import { createFileRoute } from "@tanstack/react-router";
import { LoggedOutPage } from "../component/auth/LoggedOutPage.tsx";

export const Route = createFileRoute("/logout")({
  component: function () {
    return <LoggedOutPage />;
  },
});
