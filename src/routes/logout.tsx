import { createFileRoute } from "@tanstack/react-router";
import { LoggedOutPage } from "../component/login/LoggedOutPage.tsx";

export const Route = createFileRoute("/logout")({
  component: function () {
    return <LoggedOutPage />;
  },
});
