import { createFileRoute } from "@tanstack/react-router";
import { Page } from "../../../../component";
import { AuthGate } from "../../../../component/auth/AuthGate.tsx";
import { AnnotationDetail } from "../../../../component/annotation/AnnotationDetail.tsx";
import {
  ToAnnotation,
  ToContainer,
  ToContainers,
  ToHome,
} from "../../../../component/common/BreadcrumbNav.tsx";
import { createAnnotationId } from "../../../../component/annotation/createAnnotationId.ts";
import { useStore } from "../../../../store/useStore.ts";

export const Route = createFileRoute(
  "/container/$containerName/annotation/$annotationName",
)({
  component: function AnnotationName() {
    const { containerName, annotationName } = Route.useParams();
    const navigate = Route.useNavigate();
    const { selectedHost } = useStore();
    const id = createAnnotationId(containerName, annotationName, selectedHost);

    const handleClose = async () => {
      navigate({
        to: "/container/$containerName",
        params: { containerName },
      });
    };

    return (
      <AuthGate>
        <Page
          breadcrumbs={[
            <ToHome />,
            <ToContainers />,
            <ToContainer containerName={containerName} />,
            <ToAnnotation
              containerName={containerName}
              annotationName={annotationName}
            />,
          ]}
        >
          <AnnotationDetail id={id} onClose={handleClose} />
        </Page>
      </AuthGate>
    );
  },
});
