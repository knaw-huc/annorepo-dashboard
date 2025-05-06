import {createFileRoute} from '@tanstack/react-router'
import {AnnoRepoDetail, ContainerIndex, Page} from "../component";
import {Login} from "../component/login/Login.tsx";
import {Hr} from "../component/common/Hr.tsx";

export const Route = createFileRoute('/')({
  component: Component,
})


function Component() {
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

