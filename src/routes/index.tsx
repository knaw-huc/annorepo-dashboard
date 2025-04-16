import {createFileRoute} from '@tanstack/react-router'
import {ContainersPage} from "../container/ContainersPage.tsx";
import {Page} from "../common/Page.tsx";

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

