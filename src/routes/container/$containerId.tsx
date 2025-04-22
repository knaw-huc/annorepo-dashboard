import {createFileRoute} from '@tanstack/react-router'
import {ContainerDetail, Page} from "../../component";

export const Route = createFileRoute('/container/$containerId')({
  component: ContainerIndex,
})

function ContainerIndex() {
  const {containerId} = Route.useParams()

  return (
    <Page>
      <pre>{containerId}</pre>
      <ContainerDetail/>
    </Page>
  )
}
