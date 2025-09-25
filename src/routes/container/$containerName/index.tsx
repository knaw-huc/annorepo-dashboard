import { createFileRoute } from "@tanstack/react-router";
import { ContainerDetail, Page } from "../../../component";
import { AuthGuard } from "../../../component/auth/AuthGuard.tsx";
import {
  ToContainers,
  ToHome,
} from "../../../component/common/BreadcrumbNav.tsx";

export const Route = createFileRoute("/container/$containerName/")({
  component: Component,
});

function Component() {
  const { containerName } = Route.useParams();
  const navigate = Route.useNavigate();

  const handleClose = async () => {
    navigate({
      to: "/container",
    });
  };

  async function handleClickAnnotationEditor() {
    navigate({
      to: "/container/$containerName/annotation/editor",
      params: { containerName },
    });
  }

  async function handleClickSearchAnnotations() {
    navigate({
      to: "/container/$containerName/search",
      params: { containerName },
    });
  }

  return (
    <AuthGuard>
      <Page breadcrumbs={[<ToHome />, <ToContainers />]}>
        <ContainerDetail
          name={containerName}
          onClose={handleClose}
          onCreateAnnotation={handleClickAnnotationEditor}
          onSearchAnnotations={handleClickSearchAnnotations}
        />
      </Page>
    </AuthGuard>
  );
}
