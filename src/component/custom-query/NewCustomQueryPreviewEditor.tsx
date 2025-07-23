import { QueryEditor } from "../common/search/QueryEditor.tsx";
import { AnnotationPage } from "../annotation/AnnotationPage.tsx";
import { useEffect, useState } from "react";
import { useGet } from "../../client/query/useGet.tsx";
import { ArMyContainers } from "../../model/ArModel.ts";
import { toPageNo } from "../../util/toPageNo.ts";
import { getContainerNames } from "../../client/endpoint/getContainerNames.tsx";
import { useSearchQuery } from "../../store/query/hooks/useSearchQuery.ts";
import {
  ContainerSearchArgs,
  useContainerSearch,
} from "../../client/endpoint/useContainerSearch.tsx";

import { ContainerDropdown } from "./ContainerDropdown.tsx";
import { toComparisonForm } from "../../store/query/util/toComparisonForm.ts";
import { mapValues } from "lodash";
import { useStore } from "../../store/useStore.ts";
import { toParamName } from "../../store/query/util/toParamName.ts";
import { SearchButton } from "../common/search/button/SearchButton.tsx";
import { hasErrors } from "../../store/query/util/hasErrors.ts";
import { AddSubQueryButton } from "../common/search/button/AddSubQueryButton.tsx";
import { Button } from "../common/Button.tsx";
import { Store } from "../common/icon/Store.tsx";
import { Next } from "../common/icon/Next.tsx";
import { QR } from "../../client/query/QR.tsx";
import { defaultQuery } from "../../model/query/defaultQuery.ts";

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
  const { subqueries, addSubquery } = useStore();

  useEffect(() => {
    if (!isInit && containerNames.length && query) {
      setInit(true);
      setSubmitted({ query, pageNo, containerName: "" });
    }
  }, [isInit, containerNames, query]);

  const handleChangePage = (update: string) => {
    setPageNo(toPageNo(update));
  };

  const handleSubmit = () => {
    if (hasErrors(subqueries)) {
      return;
    }
    setSubmitted({ query, pageNo, containerName });
  };

  function handleAddSubQuery() {
    const newQueryEntry = Object.entries(defaultQuery)[0];
    const form = toComparisonForm(newQueryEntry);
    const errors = mapValues(form, () => "");
    const newFormIndex = subqueries.length;
    const param = toParamName(form, newFormIndex);
    addSubquery({
      path: [subqueries.length],
      subquery: { form, errors, type: "comparison", param },
    });
  }

  const searchDisabled: boolean =
    !containerName ||
    !!page.error ||
    !subqueries.length ||
    hasErrors(subqueries);

  return (
    <>
      <div>
        <ContainerDropdown
          selected={containerName}
          onSelect={onSetContainerName}
        />
        <SearchButton onClick={handleSubmit} disabled={searchDisabled} />
        {containerName && (
          <Button
            secondary
            className="ml-3"
            onClick={props.onSave}
            disabled={!containerName || hasErrors(subqueries)}
          >
            <Store className="mr-2" />
            Store as custom query <Next className="mr-2" />
          </Button>
        )}
      </div>

      {containerName && (
        <>
          <div className="mt-7">
            <QueryEditor containerName={containerName} />
            <span className="inline-block">
              <AddSubQueryButton
                onClick={handleAddSubQuery}
                disabled={searchDisabled}
              />
            </span>
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
