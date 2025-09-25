import { createFileRoute } from "@tanstack/react-router";
import { ContainerIndex, Page } from "../../component";
import { AuthGuard } from "../../component/auth/AuthGuard.tsx";
import { ToContainers, ToHome } from "../../component/common/BreadcrumbNav.tsx";

export const Route = createFileRoute("/container/")({
  component: function Container() {
    const navigate = Route.useNavigate();

    async function handleClickContainerForm() {
      navigate({
        to: "/container/editor",
      });
    }

    return (
      <AuthGuard>
        <Page breadcrumbs={[<ToHome />, <ToContainers />]}>
          <ContainerIndex onClickCreateContainer={handleClickContainerForm} />
        </Page>
      </AuthGuard>
    );
  },
});
