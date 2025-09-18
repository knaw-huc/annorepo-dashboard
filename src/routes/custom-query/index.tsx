import { createFileRoute } from "@tanstack/react-router";
import { Page } from "../../component";
import { ToHome } from "../../component/common/BreadcrumbNav.tsx";
import { Auth } from "../../component/auth/Auth.tsx";
import { CustomQueryIndex } from "../../component/custom-query/CustomQueryIndex.tsx";

export const Route = createFileRoute("/custom-query/")({
  component: function CustomQuery() {
    const navigate = Route.useNavigate();

    async function handleClickOpenCustomQuery(customQueryName: string) {
      navigate({
        to: "/custom-query/$customQueryName",
        params: { customQueryName },
      });
    }

    async function handleClickNewCustomQuery() {
      navigate({
        to: "/custom-query/editor",
      });
    }

    return (
      <Auth>
        <Page breadcrumbs={[<ToHome />]}>
          <CustomQueryIndex
            onClickOpenCustomQuery={handleClickOpenCustomQuery}
            // TODO:
            onClickCreateCustomQuery={handleClickNewCustomQuery}
          />
        </Page>
      </Auth>
    );
  },
});
