import {createFileRoute} from '@tanstack/react-router'
import {ContainerIndex, Page} from "../component";

export const Route = createFileRoute('/')({
  component: RootIndex,
})


function RootIndex() {
  return (
    <Page>
      <ContainerIndex />
    </Page>
  )
}

