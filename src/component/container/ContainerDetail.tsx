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
import { canEdit } from "../../model/user/canEdit.ts";
import { useContainerRole } from "./useContainerRole.tsx";
import { ContainerUsers } from "./ContainerUsers.tsx";
import { isAdmin } from "../../model/user/isAdmin.ts";
import { Remove } from "../common/icon/Remove.tsx";
import { useDelete } from "../../client/query/useDelete.tsx";
import { Warning } from "../common/Warning.tsx";
import { useQueryClient } from "@tanstack/react-query";
import { keyEquals } from "../../client/query/useGet.tsx";

export type ContainerDetailProps = {
  name: string;
  onClose: () => void;
  onCreateAnnotation: () => void;
  onSearchAnnotations: () => void;
};

const NO_PAGE = -1;

export function ContainerDetail(props: ContainerDetailProps) {
  const { name } = props;
  const [pageNo, setPageNo] = useState<number>(NO_PAGE);
  const [isInit, setInit] = useState(false);
  const [error, setError] = useState("");

  const container = useContainer(name);
  const role = useContainerRole({ idOrName: name });
  const removeContainer = useDelete("/w3c/{containerName}");
  const queryClient = useQueryClient();
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

  const handleRemove = () => {
    if (
      !window.confirm(
        "Delete container?\nPlease note that this will also delete all of its annotations.",
      )
    ) {
      return;
    }
    if (!container.data) {
      return;
    }
    removeContainer.mutate(
      {
        params: {
          path: { containerName: name },
          query: { force: true },
        },
        headers: { "If-Match": container.data.ETag },
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            predicate: (query) => keyEquals(query, "/w3c", "/my/containers"),
          });
          props.onClose();
        },
        onError: (e) => setError(`Could not remove container: ${e.message}`),
      },
    );
  };

  if (!container.isSuccess) {
    return <StatusMessage name="container" requests={[container]} />;
  }

  return (
    <div>
      <H1>
        {container.data.label} <Hint>container</Hint>
      </H1>
      {error && <Warning onClose={() => setError("")}>{error}</Warning>}
      {isAdmin(role) && (
        <Button onClick={handleRemove} className="mr-2">
          Delete
          <Remove className="ml-1" />
        </Button>
      )}
      <ContainerSummary name={name} role={role} className="mt-5" />
      {isAdmin(role) && <ContainerUsers containerName={name} />}
      <ContainerAnnotationFields name={props.name} />
      <H2>Annotations</H2>
      <div className="mb-3">
        {canEdit(role) && (
          <Button onClick={props.onCreateAnnotation} className="mr-2">
            Add
            <Add className="ml-1" />
          </Button>
        )}
        <Button onClick={props.onSearchAnnotations}>
          Search
          <Search className="ml-1" />
        </Button>
      </div>
      {pageNo === NO_PAGE ? (
        <Loading name="annotations" />
      ) : (
        <ContainerAnnotationPage
          containerName={name}
          pageNo={pageNo}
          onChangePageNo={handleChangePage}
          role={role}
        />
      )}
    </div>
  );
}
