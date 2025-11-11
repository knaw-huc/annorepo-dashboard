import { createFileRoute } from "@tanstack/react-router";
import { NewCustomQueryEditor } from "../../component/custom-query/NewCustomQueryEditor.tsx";
import {
  ToCustomQueryIndex,
  ToHome,
} from "../../component/common/BreadcrumbNav.tsx";
import { AuthGate } from "../../component/auth/AuthGate.tsx";
import { Page } from "../../component";

export const Route = createFileRoute("/custom-query/editor")({
  component: function Component() {
    const navigate = Route.useNavigate();

    const handleClose = async () => {
      navigate({
        to: "/custom-query",
      });
    };

    return (
      <AuthGate needsAuth={true}>
        <Page breadcrumbs={[<ToHome />, <ToCustomQueryIndex />]}>
          <NewCustomQueryEditor onClose={handleClose} />
        </Page>
      </AuthGate>
    );
  },
});
