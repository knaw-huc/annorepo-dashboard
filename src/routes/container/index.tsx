import {createFileRoute} from '@tanstack/react-router'
import {ContainerIndex, Page} from "../../component";
import {Login} from "../../component/login/Login.tsx";
import {ToContainers, ToHome} from "../../component/common/BreadcrumbNav.tsx";

export const Route = createFileRoute('/container/')({
  component: () => {
    const navigate = Route.useNavigate()

    async function handleClickContainerForm() {
      navigate({
        to: "/container/form",
      })
    }

    return (
      <Login>
        <Page breadcrumbs={[
          <ToHome/>,
          <ToContainers/>,
        ]}
        >
          <ContainerIndex
            onClickCreateContainer={handleClickContainerForm}
          />
        </Page>
      </Login>
    )
  },
})

