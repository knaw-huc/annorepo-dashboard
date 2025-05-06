import {createFileRoute} from '@tanstack/react-router'
import {Page} from "../../../component";
import {Login} from "../../../component/login/Login.tsx";
import {
  ContainerSearch
} from "../../../component/container/ContainerSearch.tsx";
import {
  toContainer,
  toContainers,
  toHome
} from "../../../component/common/BreadcrumbNav.tsx";

export const Route = createFileRoute('/container/$containerName/search')({
  component: Component,
})

function Component() {
  const {containerName} = Route.useParams()
  const navigate = Route.useNavigate()

  const handleClose = async () => {
    navigate({
      to: '/container/$containerName',
      params: {containerName}
    });
  };

  return (
    <Page
      breadcrumbs={[
        toHome,
        toContainers,
        toContainer(containerName, {containerName})
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
