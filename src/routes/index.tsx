import {createFileRoute} from '@tanstack/react-router'
import {Home} from "../components/Home.tsx";
import {Page} from "../components/common/Page.tsx";

export const Route = createFileRoute('/')({
  component: RootIndex,
})


function RootIndex() {
  return (
    <Page>
      <Home />
    </Page>
  )
}

