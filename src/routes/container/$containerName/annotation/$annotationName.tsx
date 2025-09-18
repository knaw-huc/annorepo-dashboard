import { createFileRoute } from "@tanstack/react-router";
import { Page } from "../../../../component";
import { Auth } from "../../../../component/auth/Auth.tsx";
import { AnnotationDetail } from "../../../../component/annotation/AnnotationDetail.tsx";
import {
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
      <Auth>
        <Page
          breadcrumbs={[
            <ToHome />,
            <ToContainers />,
            <ToContainer name={containerName} />,
          ]}
        >
          <AnnotationDetail id={id} onClose={handleClose} />
        </Page>
      </Auth>
    );
  },
});
