import {createFileRoute} from '@tanstack/react-router'
import {Page} from "../../component";
import {ToHome} from "../../component/common/BreadcrumbNav.tsx";
import {Login} from "../../component/login/Login.tsx";
import {
  CustomQueryIndex
} from "../../component/custom-query/CustomQueryIndex.tsx";

export const Route = createFileRoute('/custom-query/')({
  component: () => {
    const navigate = Route.useNavigate()

    async function handleClickOpenCustomQuery(customQueryName: string) {
      navigate({
        to: "/custom-query/$customQueryName",
        params: {customQueryName}
      })
    }

    async function handleClickNewCustomQuery() {
      navigate({
        to: "/custom-query/editor"
      })
    }

    return <Login>
      <Page breadcrumbs={[
        <ToHome/>,
      ]}>
        <CustomQueryIndex
          onClickOpenCustomQuery={handleClickOpenCustomQuery}
          // TODO:
          onClickCreateCustomQuery={handleClickNewCustomQuery}
        />
      </Page>
    </Login>;
  },
})

