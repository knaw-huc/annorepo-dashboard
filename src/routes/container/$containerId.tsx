import {createFileRoute} from '@tanstack/react-router'
import {ContainerDetail, Page} from "../../component";
import {Login} from "../../component/login/Login.tsx";

export const Route = createFileRoute('/container/$containerId')({
  component: ContainerIndex,
})

function ContainerIndex() {
  const {containerId} = Route.useParams()

  return (
    <Page>
      <Login>
        <ContainerDetail
          id={containerId}
        />
      </Login>
    </Page>
  )
}
