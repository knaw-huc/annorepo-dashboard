import {createFileRoute} from '@tanstack/react-router'
import {AnnoRepoDetail, Page} from "../component";

export const Route = createFileRoute('/')({
  component: RootIndex,
})


function RootIndex() {
  return (
    <Page>
      <AnnoRepoDetail/>
    </Page>
  )
}

