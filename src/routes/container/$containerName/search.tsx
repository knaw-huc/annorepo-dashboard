import {createFileRoute} from '@tanstack/react-router'
import {Loading, Page} from "../../../component";
import {Login} from "../../../component/login/Login.tsx";
import {
  ContainerSearch
} from "../../../component/container/ContainerSearch.tsx";
import {
  toContainer,
  toContainers,
  toHome
} from "../../../component/common/BreadcrumbNav.tsx";
import {useContainer} from "../../../client/endpoint/useContainer.tsx";

export const Route = createFileRoute('/container/$containerName/search')({
  component: ContainerIndex,
})

function ContainerIndex() {
  const {containerName} = Route.useParams()
  const navigate = Route.useNavigate()

  const {data: container} = useContainer(containerName)

  const handleClose = async () => {
    navigate({
      to: '/container/$containerName',
      params: {containerName}
    });
  };

  if(!container) {
    return <Loading />
  }

  return (
    <Page
      breadcrumbs={[
        toHome,
        toContainers,
        toContainer(container.label, {containerName})
      ]}
    >
      <Login>
        <ContainerSearch
          name={containerName}
          onClose={handleClose}
        />
      </Login>
    </Page>
  )
}
