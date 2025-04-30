import {createFileRoute} from '@tanstack/react-router'
import {ContainerDetail, Page} from "../../../component";
import {Login} from "../../../component/login/Login.tsx";

export const Route = createFileRoute('/container/$containerName/')({
  component: ContainerIndex,
})

function ContainerIndex() {
  const {containerName} = Route.useParams()
  const navigate = Route.useNavigate()

  async function handleClickAnnotationForm() {
    console.log('handleCreateAnnotation');
    navigate({
      to: "/container/$containerName/annotation/form",
      params: {containerName}
    })
  }

  return (
    <Page>
      <Login>
        <ContainerDetail
          name={containerName}
          onClickCreateAnnotation={handleClickAnnotationForm}
        />
      </Login>
    </Page>
  )
}
