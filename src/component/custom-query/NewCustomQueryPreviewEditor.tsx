import {QueryEditor} from "../common/search/QueryEditor.tsx";
import {AnnotationPage} from "../annotation/AnnotationPage.tsx";
import {ReactNode, useEffect, useState} from "react";
import {QR, useGet} from "../../client/query/useGet.tsx";
import {ArMyContainers} from "../../client/ArModel.ts";
import {toPageNo} from "../../util/toPageNo.ts";
import {getContainerNames} from "../../client/endpoint/getContainerNames.tsx";
import {useSearchQuery} from "../../store/query/hooks/useSearchQuery.ts";
import {
  ContainerSearchArgs,
  useContainerSearch
} from "../../client/endpoint/useContainerSearch.tsx";

import {ContainerDropdown} from "./ContainerDropdown.tsx";
import {defaultQuery} from "../common/search/QueryModel.ts";
import {toQueryFieldForm} from "../../store/query/util/toQueryFieldForm.ts";
import {mapValues} from "lodash";
import {useStore} from "../../store/useStore.ts";
import {toParamName} from "../../store/query/util/toParamName.ts";
import {SearchButton} from "../common/search/button/SearchButton.tsx";
import {hasErrors} from "../../store/query/util/hasErrors.ts";
import {AddSubQueryButton} from "../common/search/button/AddSubQueryButton.tsx";

export function NewCustomQueryPreviewEditor(props: {
  containerName: string
  onSetContainerName: (containerName: string) => void
  moreButtons?: ReactNode,
}) {
  const {containerName, onSetContainerName} = props;
  const [pageNo, setPageNo] = useState(0);

  const myContainers = useGet('/my/containers') as QR<ArMyContainers>
  const containerNames = getContainerNames(myContainers.data)
  const query = useSearchQuery()
  const [submitted, setSubmitted] = useState<ContainerSearchArgs>(
    {containerName, query, pageNo}
  )
  const [isInit, setInit] = useState<boolean>()
  const {page} = useContainerSearch(submitted);
  const {forms, errors, addForm} = useStore()
  useEffect(() => {
    if (!isInit && containerNames.length && query) {
      setInit(true)
      setSubmitted({query, pageNo, containerName: ''})
    }
  }, [isInit, containerNames, query]);


  const handleChangePage = (update: string) => {
    setPageNo(toPageNo(update))
  }

  const handleSubmit = () => {
    if (hasErrors(errors)) {
      return;
    }
    setSubmitted({query, pageNo, containerName})
  }

  function handleAddSubQuery() {
    const newQueryEntry = Object.entries(defaultQuery)[0];
    const form = toQueryFieldForm(newQueryEntry)
    const error = mapValues(form, () => '');
    const newFormIndex = forms.length;
    const param = toParamName(form, newFormIndex)
    addForm({form, error, param})
  }

  const searchDisabled: boolean =
    !containerName
    || !!page.error
    || !forms.length
    || hasErrors(errors);

  return <>
    <QueryEditor
      containerName={containerName}
    />
    <div className="mb-2">
      <AddSubQueryButton
        onClick={handleAddSubQuery}
        disabled={searchDisabled}
      />
      {props.moreButtons}
      <span className="ml-5">
        <ContainerDropdown
          selected={containerName}
          onSelect={onSetContainerName}
        />
      </span>
      <SearchButton
        onClick={handleSubmit}
        disabled={searchDisabled}
      />

    </div>
    {page.data
      && <AnnotationPage
        pageNo={pageNo}
        page={page.data}
        onChangePageNo={handleChangePage}
      />
    }</>
}
