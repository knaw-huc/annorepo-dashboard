import {createFileRoute} from '@tanstack/react-router'
import {ContainerGallery, Page} from "../component";

export const Route = createFileRoute('/')({
  component: RootIndex,
})


function RootIndex() {
  return (
    <Page>
      <ContainerGallery />
    </Page>
  )
}

