import { createFileRoute } from "@tanstack/react-router";

import { ContainerEditor } from "../../component/container/ContainerEditor.tsx";
import { Auth } from "../../component/auth/Auth.tsx";
import { Page } from "../../component";
import { ToContainers, ToHome } from "../../component/common/BreadcrumbNav.tsx";

export const Route = createFileRoute("/container/editor")({
  component: Component,
});

function Component() {
  const navigate = Route.useNavigate();

  const handleClose = async () => {
    navigate({
      to: "/",
    });
  };

  const handleCreate = async (containerName: string) => {
    navigate({
      to: "/container/$containerName",
      params: { containerName },
    });
  };

  return (
    <Auth>
      <Page breadcrumbs={[<ToHome />, <ToContainers />]}>
        <ContainerEditor onClose={handleClose} onCreate={handleCreate} />
      </Page>
    </Auth>
  );
}
