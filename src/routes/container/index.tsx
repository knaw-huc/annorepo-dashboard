import {createFileRoute} from '@tanstack/react-router'
import {ContainerIndex, Page} from "../../component";
import {Login} from "../../component/login/Login.tsx";

export const Route = createFileRoute('/container/')({
  component: () => {
    return (
      <Page>
        <Login>
          <ContainerIndex/>
        </Login>
      </Page>
    )
  },
})

