import {createFileRoute} from '@tanstack/react-router'
import {Page} from "../../../../component";
import {Login} from "../../../../component/login/Login.tsx";
import {
  AnnotationDetail
} from "../../../../component/annotation/AnnotationDetail.tsx";

export const Route = createFileRoute('/container/$containerName/annotation/$annotationName')({
  component: ContainerIndex,
})

function ContainerIndex() {
  const {containerName, annotationName} = Route.useParams()
  const navigate = Route.useNavigate()
  const handleClose = async () => {
    navigate({
      to: '/container/$containerName',
      params: {containerName}
    });
  };
  return (
    <Page>
      <Login>
        <AnnotationDetail
          containerName={containerName}
          annotationName={annotationName}
          onClose={handleClose}
        />
      </Login>
    </Page>
  )
}
