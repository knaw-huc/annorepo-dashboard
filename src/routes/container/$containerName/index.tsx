import {createFileRoute} from '@tanstack/react-router'
import {ContainerDetail, Page} from "../../../component";
import {Login} from "../../../component/login/Login.tsx";
import {
  ToContainers,
  ToHome
} from "../../../component/common/BreadcrumbNav.tsx";

export const Route = createFileRoute('/container/$containerName/')({
  component: Component,
})

function Component() {
  const {containerName} = Route.useParams()
  const navigate = Route.useNavigate()

  async function handleClickAnnotationEditor() {
    navigate({
      to: "/container/$containerName/annotation/editor",
      params: {containerName}
    })
  }

  async function handleClickSearchAnnotations() {
    navigate({
      to: "/container/$containerName/search",
      params: {containerName}
    })
  }

  return (
    <Login>
      <Page breadcrumbs={[
        <ToHome/>,
        <ToContainers/>,
      ]}>
        <ContainerDetail
          name={containerName}
          onClickCreateAnnotation={handleClickAnnotationEditor}
          onClickSearchAnnotations={handleClickSearchAnnotations}
        />
      </Page>
    </Login>
  )
}
