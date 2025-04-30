import {createFileRoute} from '@tanstack/react-router'
import {Page} from "../../../../component";
import {Login} from "../../../../component/login/Login.tsx";
import {
  AnnotationForm
} from "../../../../component/annotation/AnnotationForm.tsx";

export const Route = createFileRoute('/container/$containerName/annotation/form')({
  component: ContainerIndex,
})

function ContainerIndex() {
  const {containerName} = Route.useParams()
  const navigate = Route.useNavigate()

  const handleClose = async () => {
    navigate({
      to: '/container/$containerName',
      params: {containerName}
    });
  };

  const handleCreate = async (annotationName: string) => {
    navigate({
      to: '/container/$containerName/annotation/$annotationName',
      params: {containerName, annotationName}
    });
  };

  return (
    <Page>
      <Login>
        <AnnotationForm
          containerName={containerName}
          onClose={handleClose}
          onCreate={handleCreate}
        />
      </Login>
    </Page>
  )
}
