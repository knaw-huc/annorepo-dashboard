import {createFileRoute} from '@tanstack/react-router'
import {AnnoRepoDetail, ContainerIndex, Page} from "../component";
import {Login} from "../component/login/Login.tsx";
import {Hr} from "../component/common/Hr.tsx";
import {ToHome} from "../component/common/BreadcrumbNav.tsx";

export const Route = createFileRoute('/')({
  component: Component,
})


function Component() {
  return (
    <Login>
      <Page breadcrumbs={[
        <ToHome/>,
      ]}>
        <AnnoRepoDetail/>
        <Hr/>
        <ContainerIndex/>
      </Page>
    </Login>
  )
}

