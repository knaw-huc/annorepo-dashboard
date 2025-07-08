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
import {
  createAnnotationId
} from "../../../../component/annotation/createAnnotationId.ts";
import {useConfig} from "../../../../component/ConfigProvider.tsx";

export const Route = createFileRoute('/container/$containerName/annotation/$annotationName')({
  component: function () {
    const {containerName, annotationName} = Route.useParams()
    const navigate = Route.useNavigate()
    const config = useConfig()
    const id = createAnnotationId(containerName, annotationName, config.AR_HOST)

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
            id={id}
            onClose={handleClose}
          />
        </Page>
      </Login>
    )
  },
})

