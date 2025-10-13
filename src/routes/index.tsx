import { createFileRoute } from "@tanstack/react-router";
import { ToHome } from "../component/common/BreadcrumbNav.tsx";
import { AuthGate } from "../component/auth/AuthGate.tsx";
import { Page } from "../component";
import { ContainerIndex } from "../component";

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
        <ContainerIndex onClickCreateContainer={handleClickContainerForm} />
      </Page>
    </AuthGate>
  );
}
