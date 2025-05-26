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

// TODO: add link to form
export const Route = createFileRoute('/custom-query/form')({
  component: () => {
    const navigate = Route.useNavigate()

    const handleClose = async () => {
      navigate({
        to: '/custom-query',
      });
    };

    return <Login>
      <Page breadcrumbs={[
        <ToHome/>,
        <ToCustomQueryIndex/>,
      ]}>
        <CustomQueryDetail
          onClose={handleClose}
        />
      </Page>
    </Login>;
  },
})

