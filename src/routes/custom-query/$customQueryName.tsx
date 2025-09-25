import { createFileRoute } from "@tanstack/react-router";
import { CustomQueryDetail } from "../../component/custom-query/CustomQueryDetail.tsx";
import { Page } from "../../component";
import {
  ToCustomQueryIndex,
  ToHome,
} from "../../component/common/BreadcrumbNav.tsx";
import { AuthGuard } from "../../component/auth/AuthGuard.tsx";

export const Route = createFileRoute("/custom-query/$customQueryName")({
  component: RouteComponent,
});

function RouteComponent() {
  const { customQueryName } = Route.useParams();
  const navigate = Route.useNavigate();

  const handleClose = async () => {
    navigate({
      to: "/custom-query",
    });
  };

  return (
    <div>
      <AuthGuard>
        <Page breadcrumbs={[<ToHome />, <ToCustomQueryIndex />]}>
          <CustomQueryDetail name={customQueryName} onClose={handleClose} />
        </Page>
      </AuthGuard>
    </div>
  );
}
