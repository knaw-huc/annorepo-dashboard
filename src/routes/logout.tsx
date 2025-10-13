import { createFileRoute } from "@tanstack/react-router";
import { LoggedOutPage } from "../component/auth/LoggedOutPage.tsx";
import { AuthGate } from "../component/auth/AuthGate.tsx";

export const Route = createFileRoute("/logout")({
  component: function () {
    return (
      <AuthGate>
        <LoggedOutPage />
      </AuthGate>
    );
  },
});
