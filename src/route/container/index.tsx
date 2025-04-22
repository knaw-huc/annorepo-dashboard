import {createFileRoute} from '@tanstack/react-router'
import {ContainerPage, Page} from "../../component";

export const Route = createFileRoute('/container/')({
  component: ContainerIndex,
})

function ContainerIndex() {

  return (
    <Page>
      <ContainerPage />
    </Page>
  )
}
