import {createFileRoute} from '@tanstack/react-router'
import {Page} from "../../component";

export const Route = createFileRoute('/container/')({
  component: ContainerIndex,
})

function ContainerIndex() {

  return (
    <Page>
      <ContainerIndex />
    </Page>
  )
}
