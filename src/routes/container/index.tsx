import {createFileRoute} from '@tanstack/react-router'
import {Page} from "../../components/common/Page.tsx";
import {ContainerPage} from "../../components/container/ContainerPage.tsx";

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
