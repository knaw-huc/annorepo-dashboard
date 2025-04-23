import {createFileRoute} from '@tanstack/react-router'
import {ContainerIndex, Page} from "../../component";

export const Route = createFileRoute('/container/')({
  component: () => {
    return (
      <Page>
        <ContainerIndex/>
      </Page>
    )
  },
})

