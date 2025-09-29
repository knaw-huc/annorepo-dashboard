import { createFileRoute } from "@tanstack/react-router";
import { AnnoRepoDetail, ContainerIndex, Page } from "../component";
import { Hr } from "../component/common/Hr.tsx";
import { ToHome } from "../component/common/BreadcrumbNav.tsx";
import { AuthGate } from "../component/auth/AuthGate.tsx";

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
    <AuthGate>
      <Page breadcrumbs={[<ToHome />]}>
        <AnnoRepoDetail />
        <Hr />
        <ContainerIndex onClickCreateContainer={handleClickContainerForm} />
      </Page>
    </AuthGate>
  );
}
