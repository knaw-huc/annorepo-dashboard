import { createFileRoute } from "@tanstack/react-router";
import { Page } from "../../../../component";
import { AuthGate } from "../../../../component/auth/AuthGate.tsx";
import { AnnotationEditor } from "../../../../component/annotation/AnnotationEditor.tsx";
import {
  ToContainer,
  ToContainers,
  ToHome,
} from "../../../../component/common/BreadcrumbNav.tsx";

export const Route = createFileRoute(
  "/container/$containerName/annotation/editor",
)({
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

  const handleCreate = async (annotationName: string) => {
    navigate({
      to: "/container/$containerName/annotation/$annotationName",
      params: { containerName, annotationName },
    });
  };

  return (
    <AuthGate>
      <Page
        breadcrumbs={[
          <ToHome />,
          <ToContainers />,
          <ToContainer name={containerName} />,
        ]}
      >
        <AnnotationEditor
          containerName={containerName}
          onClose={handleClose}
          onCreate={handleCreate}
        />
      </Page>
    </AuthGate>
  );
}
