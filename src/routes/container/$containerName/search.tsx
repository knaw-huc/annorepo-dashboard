import { createFileRoute } from "@tanstack/react-router";
import { Page } from "../../../component";
import { AuthGuard } from "../../../component/auth/AuthGuard.tsx";
import { ContainerSearch } from "../../../component/container/ContainerSearch.tsx";
import {
  ToContainer,
  ToContainers,
  ToHome,
} from "../../../component/common/BreadcrumbNav.tsx";

export const Route = createFileRoute("/container/$containerName/search")({
  component: Component,
});

function Component() {
  const { containerName } = Route.useParams();
  const navigate = Route.useNavigate();

  const handleClose = async () => {
    navigate({
      to: "/container/$containerName",
      params: { containerName },
    });
  };

  return (
    <AuthGuard>
      <Page
        breadcrumbs={[
          <ToHome />,
          <ToContainers />,
          <ToContainer name={containerName} />,
        ]}
      >
        <ContainerSearch containerName={containerName} onClose={handleClose} />
      </Page>
    </AuthGuard>
  );
}
