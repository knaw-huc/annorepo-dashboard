import {createFileRoute} from '@tanstack/react-router'
import {ContainersPage} from "../components/container/ContainersPage.tsx";
import {Page} from "../components/common/Page.tsx";

export const Route = createFileRoute('/')({
  component: RootIndex,
})


function RootIndex() {
  return (
    <Page>
      <ContainersPage />
    </Page>
  )
}

