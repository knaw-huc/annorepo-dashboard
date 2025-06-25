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

export function NewCustomQueryPreviewEditor(props: {
  moreButtons?: ReactNode
}) {
  const [pageNo, setPageNo] = useState(0);

  const myContainers = useGet('/my/containers') as QR<ArMyContainers>
  const containerNames = getContainerNames(myContainers.data)
  const [containerName, setContainerName] = useState('');

  const query = useSearchQuery()
  const [submitted, setSubmitted] = useState<ContainerSearchArgs>(
    {containerName, query, pageNo}
  )
  const [isInit, setInit] = useState<boolean>()
  const {page} = useContainerSearch(submitted);

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
    setSubmitted({query, pageNo, containerName})
  }

  return <>
    <QueryEditor
      containerName={containerName}
      searchError={page.error}
      onSubmit={handleSubmit}
      moreButtons={<>
        {props.moreButtons}
        <span className="ml-5"><ContainerDropdown
          selected={containerName}
          onSelect={setContainerName}
        /></span>
      </>}
    />

    {page.data
      && <AnnotationPage
        pageNo={pageNo}
        page={page.data}
        onChangePageNo={handleChangePage}
      />
    }</>
}
