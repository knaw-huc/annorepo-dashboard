import { QueryEditor } from "../common/search/QueryEditor.tsx";
import { AnnotationPage } from "../annotation/AnnotationPage.tsx";
import { useEffect, useState } from "react";
import { useGet } from "../../client/query/useGet.tsx";
import { ArMyContainers } from "../../model/ArModel.ts";
import { toPageNo } from "../../util/toPageNo.ts";
import { getContainerNames } from "../../client/endpoint/getContainerNames.tsx";
import { useSearchQuery } from "../../store/query/hook/useSearchQuery.ts";
import {
  ContainerSearchArgs,
  useContainerSearch,
} from "../../client/endpoint/useContainerSearch.tsx";

import { ContainerDropdown } from "./ContainerDropdown.tsx";
import { useStore } from "../../store/useStore.ts";
import { hasErrors } from "../../store/query/util/error/hasErrors.ts";
import { AddComparisonSubqueryButton } from "../common/search/button/AddComparisonSubqueryButton.tsx";
import { QR } from "../../client/query/QR.tsx";
import { AddLogicalSubqueryButton } from "../common/search/button/AddLogicalSubqueryButton.tsx";
import { LogicalOperator } from "../../model/query/operator/Operator.ts";
import { NeutralButton } from "../common/NeutralButton.tsx";
import { useDebouncedCall } from "../../util/useDebouncedCall.tsx";

export function NewCustomQueryPreviewEditor(props: {
  containerName: string;
  onSetContainerName: (containerName: string) => void;
  onSave: () => void;
}) {
  const { containerName, onSetContainerName } = props;
  const [pageNo, setPageNo] = useState(0);

  const myContainers = useGet("/my/containers") as QR<ArMyContainers>;
  const containerNames = getContainerNames(myContainers.data);
  const query = useSearchQuery();
  const [submitted, setSubmitted] = useState<ContainerSearchArgs>({
    containerName,
    query,
    pageNo,
  });
  const [isInit, setInit] = useState<boolean>();
  const { page } = useContainerSearch(submitted);
  const { subqueries } = useStore();

  const hasSearchErrors = hasErrors(subqueries);
  const isSearchDisabled =
    !containerName || !!page.error || !subqueries.length || hasSearchErrors;

  useEffect(() => {
    if (!isInit && containerNames.length && query) {
      setInit(true);
      setSubmitted({ query, pageNo, containerName: "" });
    }
  }, [isInit, containerNames, query]);

  const handleSearch = useDebouncedCall(() => {
    if (isSearchDisabled || !isInit) {
      return;
    }
    setSubmitted({ query, pageNo, containerName });
  });

  useEffect(() => {
    handleSearch();
  }, [isInit, isSearchDisabled, query, pageNo, containerName, handleSearch]);

  const handleChangePage = (update: string) => {
    setPageNo(toPageNo(update));
  };

  const newSubqueryPath = [subqueries.length];

  return (
    <>
      <div className="flex justify-between items-center w-full">
        <ContainerDropdown
          selected={containerName}
          onSelect={onSetContainerName}
        />
        {containerName && (
          <NeutralButton
            className="ml-3"
            onClick={props.onSave}
            disabled={true}
          >
            Store query
          </NeutralButton>
        )}
      </div>

      {containerName && (
        <>
          <div className="mt-7">
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
            </div>
          </div>

          {page.data && (
            <AnnotationPage
              className="mt-5"
              pageNo={pageNo}
              page={page.data}
              onChangePageNo={handleChangePage}
            />
          )}
        </>
      )}
    </>
  );
}
