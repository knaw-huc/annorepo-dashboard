import { Loading } from "../common/Loading.tsx";
import { useContainer } from "../../client/endpoint/useContainer.tsx";
import { useEffect, useState } from "react";
import { toPageNo } from "../../util/toPageNo.ts";
import { AnnotationPage } from "../annotation/AnnotationPage.tsx";
import { StatusMessage } from "../common/StatusMessage.tsx";
import { QueryEditor } from "../common/search/QueryEditor.tsx";
import { H1 } from "../common/H1.tsx";
import { useSearchQuery } from "../../store/query/hooks/useSearchQuery.ts";
import { useStore } from "../../store/useStore.ts";
import {
  ContainerSearchArgs,
  useContainerSearch,
} from "../../client/endpoint/useContainerSearch.tsx";
import { SearchButton } from "../common/search/button/SearchButton.tsx";
import { hasErrors } from "../../store/query/util/hasErrors.ts";
import { AddComparisonSubqueryButton } from "../common/search/button/AddComparisonSubqueryButton.tsx";
import { defaultQuery } from "../../model/query/defaultQuery.ts";
import { LogicalOperator } from "../../model/query/operator/Operator.ts";
import { AddLogicalSubqueryButton } from "../common/search/button/AddLogicalSubqueryButton.tsx";

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

  function handleSubmitSearch() {
    if (hasErrors(subqueries)) {
      return;
    }
    setSubmitted({ containerName, query, pageNo });
  }

  const hasSearchErrors = !!search.error || hasErrors(subqueries);
  const isSearchDisabled = !subqueries.length || hasSearchErrors;

  if (!container.isSuccess || !page.isSuccess) {
    return <StatusMessage requests={[container, page]} />;
  }
  const newSubqueryPath = [subqueries.length];
  return (
    <>
      <H1>Search annotations</H1>
      <QueryEditor containerName={containerName} />
      <div className="mb-2">
        <AddComparisonSubqueryButton
          path={newSubqueryPath}
          isParam={false}
          disabled={hasSearchErrors}
        />
        <AddLogicalSubqueryButton
          path={newSubqueryPath}
          disabled={hasSearchErrors}
          operator={LogicalOperator.and}
          className="ml-3"
        />
        <AddLogicalSubqueryButton
          path={newSubqueryPath}
          disabled={hasSearchErrors}
          operator={LogicalOperator.or}
          className="ml-3"
        />
        <span className="ml-3">
          <SearchButton
            onClick={handleSubmitSearch}
            disabled={isSearchDisabled}
          />
        </span>
      </div>
      {page ? (
        <AnnotationPage
          pageNo={pageNo}
          page={page.data}
          onChangePageNo={handleChangePage}
          canDelete
        />
      ) : (
        <Loading />
      )}
    </>
  );
}
