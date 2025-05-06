import {createFileRoute} from '@tanstack/react-router'
import {AnnoRepoDetail, ContainerIndex, Page} from "../component";
import {Login} from "../component/login/Login.tsx";
import {Hr} from "../component/common/Hr.tsx";

export const Route = createFileRoute('/')({
  component: RootIndex,
})


function RootIndex() {
  return (
    <Page>
      <Login>
        <AnnoRepoDetail/>
        <Hr/>
        <ContainerIndex/>
      </Login>
    </Page>
  )
}

