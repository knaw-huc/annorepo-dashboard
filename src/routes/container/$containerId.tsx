import {createFileRoute} from '@tanstack/react-router'
import {ContainerDetail, Page} from "../../component";
import {Login} from "../../component/login/Login.tsx";
import {toName} from "../../util/toName.ts";

export const Route = createFileRoute('/container/$containerId')({
  component: ContainerIndex,
})

function ContainerIndex() {
  const {containerId} = Route.useParams()
  const containerName = toName(new URL(containerId))

  return (
    <Page>
      <Login>
        <ContainerDetail
          name={containerName}
        />
      </Login>
    </Page>
  )
}
