import {createFileRoute} from '@tanstack/react-router'
import {AnnoRepoDetail, Page} from "../component";
import {Login} from "../component/login/Login.tsx";

export const Route = createFileRoute('/')({
  component: RootIndex,
})


function RootIndex() {
  return (
    <Page>
      <Login>
        <AnnoRepoDetail/>
      </Login>
    </Page>
  )
}

