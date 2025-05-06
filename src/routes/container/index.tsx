import {createFileRoute} from '@tanstack/react-router'
import {ContainerIndex, Page} from "../../component";
import {Login} from "../../component/login/Login.tsx";
import {ToContainers, ToHome} from "../../component/common/BreadcrumbNav.tsx";

export const Route = createFileRoute('/container/')({
  component: () => {
    return (
      <Login>
        <Page breadcrumbs={[
          <ToHome/>,
          <ToContainers/>,
        ]}
        >
          <ContainerIndex/>
        </Page>
      </Login>
    )
  },
})

