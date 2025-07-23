import { createFileRoute } from "@tanstack/react-router";
import { NewCustomQueryEditor } from "../../component/custom-query/NewCustomQueryEditor.tsx";
import {
  ToCustomQueryIndex,
  ToHome,
} from "../../component/common/BreadcrumbNav.tsx";
import { Login } from "../../component/login/Login.tsx";
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
      <Login>
        <Page breadcrumbs={[<ToHome />, <ToCustomQueryIndex />]}>
          <NewCustomQueryEditor onClose={handleClose} />
        </Page>
      </Login>
    );
  },
});
