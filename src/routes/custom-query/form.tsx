import {createFileRoute} from '@tanstack/react-router'
import {
  CustomQueryDetail
} from "../../component/custom-query/CustomQueryDetail.tsx";
import {
  ToCustomQueryIndex,
  ToHome
} from "../../component/common/BreadcrumbNav.tsx";
import {Login} from "../../component/login/Login.tsx";
import {Page} from "../../component";
import {
  ArCustomQueryForm,
  FieldQuery,
  QueryOperator
} from "../../client/ArModel.ts";

let typeParameter = "<type>";
export const defaultQueryTemplate: FieldQuery = {type: {[QueryOperator.equal]: typeParameter}}

export const defaultCustomQuery: ArCustomQueryForm = {
  name: "New custom query",
  description: "Create a new custom query",
  label: "Create new custom query",
  public: true,
  query: defaultQueryTemplate,
}

// TODO: add link to form
export const Route = createFileRoute('/custom-query/form')({
  component: () => {
    const navigate = Route.useNavigate()

    async function handleOnClose() {
      navigate({
        to: "/custom-query",
      })
    }

    return <Login>
      <Page breadcrumbs={[
        <ToHome/>,
        <ToCustomQueryIndex/>,
      ]}>
        <CustomQueryDetail
          customQueryForm={defaultCustomQuery}
          onClose={handleOnClose}
        />
      </Page>
    </Login>;
  },
})

