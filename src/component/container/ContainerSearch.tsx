import { Loading } from "../common/Loading.tsx";
import { useContainer } from "../../client/endpoint/useContainer.tsx";
import { useEffect, useState } from "react";
import { toPageNo } from "../../util/toPageNo.ts";
import { AnnotationPage } from "../annotation/AnnotationPage.tsx";
import { StatusMessage } from "../common/StatusMessage.tsx";
import { QueryEditor } from "../common/search/QueryEditor.tsx";
import { H1 } from "../common/H1.tsx";
import { useSearchQuery } from "../../store/query/hook/useSearchQuery.ts";
import { useStore } from "../../store/useStore.ts";
import {
  ContainerSearchArgs,
  useContainerSearch,
} from "../../client/endpoint/useContainerSearch.tsx";
import { hasErrors } from "../../store/query/util/error/hasErrors.ts";
import { defaultQuery } from "../../model/query/defaultQuery.ts";
import { AddSubqueryDropdownMenu } from "../common/search/AddSubqueryDropdownMenu.tsx";
import { QR } from "../../client/query/QR.tsx";

export type ContainerSearchProps = {
  containerName: string;
  onClose: () => void;
};

export function ContainerSearch(props: ContainerSearchProps) {
  const { containerName } = props;
  const [pageNo, setPageNo] = useState(0);

  const container = useContainer(containerName);
  const { initWithQuery, subqueries } = useStore();
  const [isInit, setInit] = useState(false);
  const query = useSearchQuery();
  const [submitted, setSubmitted] = useState<ContainerSearchArgs>({
    containerName,
    query,
    pageNo,
  });

  useEffect(() => {
    if (isInit) {
      return;
    }
    setInit(true);
    const query = defaultQuery;
    initWithQuery(query);
    setSubmitted({ containerName, query, pageNo });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInit]);

  const { search, page } = useContainerSearch(submitted);

  useEffect(() => {
    const containerPageId = container.data?.first.id;
    if (containerPageId) {
      setPageNo(toPageNo(containerPageId));
    }
  }, [container.data?.first.id]);

  const handleChangePage = (update: string) => {
    setPageNo(toPageNo(update));
  };

  const hasSearchErrors = !!search.error || hasErrors(subqueries);
  const isSearchDisabled = !subqueries.length || hasSearchErrors;

  function handleSubmitSearch() {
    if (hasErrors(subqueries)) {
      return;
    }
    setSubmitted({ containerName, query, pageNo });
  }

  useEffect(() => {
    if (isSearchDisabled) {
      return;
    }
    handleSubmitSearch();
  }, [containerName, query, pageNo]);

  const newSubqueryPath = [subqueries.length];
  return (
    <>
      <H1>Search annotations</H1>
      <div className="flex flex-col gap-4 my-8">
        <QueryEditor containerName={containerName} />
      </div>
      <div className="mt-4 flex">
        {container.data ? (
          <AddSubqueryDropdownMenu
            path={newSubqueryPath}
            disabled={hasSearchErrors}
          />
        ) : (
          <StatusMessage name="container" requests={[container]} />
        )}
      </div>
      {page.isSuccess ? (
        <AnnotationPage
          className="flex flex-col gap-3 my-8"
          pageNo={pageNo}
          page={page.data}
          onChangePageNo={handleChangePage}
        />
      ) : (
        <div className="mt-8">
          <SearchStatusMessage request={page} />
        </div>
      )}
    </>
  );
}

export function SearchStatusMessage(props: { request: QR }) {
  const { request } = props;
  if (request.isError) {
    // Annorepo returns 500 without details:
    return "No results: Annorepo could not process query";
  }
  if (!request.data) {
    return <Loading name={"results"} />;
  }
  return null;
}
