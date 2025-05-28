import {createFileRoute} from '@tanstack/react-router'
import {
  NewCustomQuery
} from "../../component/custom-query/NewCustomQuery.tsx";
import {
  ToCustomQueryIndex,
  ToHome
} from "../../component/common/BreadcrumbNav.tsx";
import {Login} from "../../component/login/Login.tsx";
import {Page} from "../../component";

// TODO: rename all form routes to editor routes
export const Route = createFileRoute('/custom-query/editor')({
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
        <NewCustomQuery
          onClose={handleClose}
        />
      </Page>
    </Login>;
  },
})

