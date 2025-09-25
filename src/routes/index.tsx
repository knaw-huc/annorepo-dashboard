import { createFileRoute } from "@tanstack/react-router";
import { AnnoRepoDetail, ContainerIndex, Page } from "../component";
import { Hr } from "../component/common/Hr.tsx";
import { ToHome } from "../component/common/BreadcrumbNav.tsx";
import { AuthGuard } from "../component/auth/AuthGuard.tsx";

export const Route = createFileRoute("/")({
  component: Component,
});

function Component() {
  const navigate = Route.useNavigate();

  async function handleClickContainerForm() {
    navigate({
      to: "/container/editor",
    });
  }

  return (
    <AuthGuard>
      <Page breadcrumbs={[<ToHome />]}>
        <AnnoRepoDetail />
        <Hr />
        <ContainerIndex onClickCreateContainer={handleClickContainerForm} />
      </Page>
    </AuthGuard>
  );
}
