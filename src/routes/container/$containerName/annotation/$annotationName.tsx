import {createFileRoute} from '@tanstack/react-router'
import {Page} from "../../../../component";
import {Login} from "../../../../component/login/Login.tsx";
import {
  AnnotationDetail
} from "../../../../component/annotation/AnnotationDetail.tsx";
import {
  ToContainer,
  ToContainers,
  ToHome
} from "../../../../component/common/BreadcrumbNav.tsx";

export const Route = createFileRoute('/container/$containerName/annotation/$annotationName')({
  component: function () {
    const {containerName, annotationName} = Route.useParams()

    const navigate = Route.useNavigate()

    const handleClose = async () => {
      navigate({
        to: '/container/$containerName',
        params: {containerName}
      });
    };

    return (
      <Login>
        <Page breadcrumbs={[
          <ToHome/>,
          <ToContainers/>,
          <ToContainer name={containerName}/>
        ]}>
          <AnnotationDetail
            containerName={containerName}
            annotationName={annotationName}
            onClose={handleClose}
          />
        </Page>
      </Login>
    )
  },
})

