import { H1 } from "../common/H1.tsx";
import { Hint } from "../common/Hint.tsx";
import { Loading } from "../common/Loading.tsx";
import { useContainer } from "../../client/endpoint/useContainer.tsx";
import { ContainerAnnotationPage } from "./ContainerAnnotationPage.tsx";
import { ContainerAnnotationFields } from "./ContainerAnnotationFields.tsx";
import { Button } from "../common/Button.tsx";
import { useEffect, useState } from "react";
import { toPageNo } from "../../util/toPageNo.ts";
import { H2 } from "../common/H2.tsx";
import { Add } from "../common/icon/Add.tsx";
import { Search } from "../common/icon/Search.tsx";
import { StatusMessage } from "../common/StatusMessage.tsx";

import { ContainerSummary } from "./ContainerSummary.tsx";
import { useGet } from "../../client/query/useGet.tsx";
import { QR } from "../../client/query/QR.tsx";
import { ArMyContainers } from "../../model/ArModel.ts";
import { getRolesByName } from "./getRolesByName.ts";
import { toName } from "../../util/toName.ts";
import { UserRole } from "../../model/user/UserRole.tsx";
import { canEdit } from "../../model/user/canEdit.ts";

export type ContainerDetailProps = {
  name: string;
  onClickCreateAnnotation: () => void;
  onClickSearchAnnotations: () => void;
};

const NO_PAGE = -1;

export function ContainerDetail(props: ContainerDetailProps) {
  const { name } = props;
  const [pageNo, setPageNo] = useState<number>(NO_PAGE);
  const container = useContainer(name);
  const [isInit, setInit] = useState(false);

  const myContainers = useGet("/my/containers") as QR<ArMyContainers>;
  const containerRole =
    myContainers.data && container.data
      ? getRolesByName(myContainers.data)[toName(container.data.id)]
      : UserRole.UNKNOWN;

  useEffect(() => {
    if (isInit || !container.data) {
      return;
    }
    setInit(true);
    const containerPageId = container.data.first.id;
    setPageNo(toPageNo(containerPageId));
  }, [container, setInit]);

  const handleChangePage = (update: number) => {
    setPageNo(update);
  };

  if (!container.isSuccess) {
    return <StatusMessage requests={[container]} />;
  }

  return (
    <div>
      <H1>
        {container.data.label} <Hint>container</Hint>
      </H1>
      <ContainerSummary name={name} role={containerRole} className="mt-5" />
      <ContainerAnnotationFields name={props.name} />
      <H2>Annotations</H2>
      <div className="mb-3">
        {canEdit(containerRole) && (
          <Button onClick={props.onClickCreateAnnotation} className="mr-2">
            Add
            <Add className="ml-1" />
          </Button>
        )}
        <Button onClick={props.onClickSearchAnnotations}>
          Search
          <Search className="ml-1" />
        </Button>
      </div>
      {pageNo === NO_PAGE ? (
        <Loading />
      ) : (
        <ContainerAnnotationPage
          containerName={name}
          pageNo={pageNo}
          onChangePageNo={handleChangePage}
        />
      )}
    </div>
  );
}
