import {createFileRoute} from '@tanstack/react-router'
import {ContainerDetail, Page} from "../../../component";
import {Login} from "../../../component/login/Login.tsx";

export const Route = createFileRoute('/container/$containerName/')({
  component: Component,
})

function Component() {
  const {containerName} = Route.useParams()
  const navigate = Route.useNavigate()

  async function handleClickAnnotationForm() {
    navigate({
      to: "/container/$containerName/annotation/form",
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
    <Page>
      <Login>
        <ContainerDetail
          name={containerName}
          onClickCreateAnnotation={handleClickAnnotationForm}
          onClickSearchAnnotations={handleClickSearchAnnotations}
        />
      </Login>
    </Page>
  )
}
