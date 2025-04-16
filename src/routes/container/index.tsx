import { createFileRoute } from '@tanstack/react-router'
import {Page} from "../../common/Page.tsx";
import {ContainerPage} from "../../container/ContainerPage.tsx";

const path = '/container/';
export const Route = createFileRoute(path)({
  component: ContainerIndex,
})

function ContainerIndex() {
  return (
    <Page>
      <ContainerPage />
    </Page>
  )
}
