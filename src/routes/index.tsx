import {createFileRoute} from '@tanstack/react-router'
import {AnnoRepoDetail, ContainerIndex, Page} from "../component";
import {Login} from "../component/login/Login.tsx";
import {Hr} from "../component/common/Hr.tsx";
import {ToHome} from "../component/common/BreadcrumbNav.tsx";

export const Route = createFileRoute('/')({
  component: Component,
})


function Component() {
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
      ]}>
        <AnnoRepoDetail/>
        <Hr/>
        <ContainerIndex
          onClickCreateContainer={handleClickContainerForm}
        />
      </Page>
    </Login>
  )
}

