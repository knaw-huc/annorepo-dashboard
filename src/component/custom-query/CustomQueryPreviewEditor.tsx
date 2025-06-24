import {QueryEditor} from "../common/search/QueryEditor.tsx";
import {AnnotationPage} from "../annotation/AnnotationPage.tsx";
import {Loading} from "../common/Loading.tsx";
import {ReactNode, useEffect, useState} from "react";
import {QR, useGet} from "../../client/query/useGet.tsx";
import {ArMyContainers, SearchQuery} from "../../client/ArModel.ts";
import {toPageNo} from "../../util/toPageNo.ts";
import {getContainerNames} from "../../client/endpoint/getContainerNames.tsx";
import {useSearchQuery} from "../../store/query/hooks/useSearchQuery.ts";
import {useContainerSearch} from "../../client/endpoint/useContainerSearch.tsx";
import {Dropdown} from "../common/form/Dropdown.tsx";

export function CustomQueryPreviewEditor(props: {
  moreButtons?: ReactNode
}) {
  const [pageNo, setPageNo] = useState(0);

  const myContainers = useGet('/my/containers') as QR<ArMyContainers>
  const containerNames = getContainerNames(myContainers.data)
  const [containerName, setContainerName] = useState('');

  const [submittedQuery, setSubmittedQuery] = useState<SearchQuery>()
  const [isInit, setInit] = useState<boolean>()
  const query = useSearchQuery()
  const {page} = useContainerSearch(containerName, submittedQuery, pageNo);

  useEffect(() => {
    if(!isInit && containerNames.length && query) {
      setInit(true)
      setSubmittedQuery(query)
      setContainerName(containerNames[0])
    }
  }, [isInit, containerNames, query]);


  const handleChangePage = (update: string) => {
    setPageNo(toPageNo(update))
  }

  return <>
    <QueryEditor
      containerName={containerName}
      searchError={page.error}
      onSubmit={() => setSubmittedQuery(query)}
      moreButtons={<>
        {props.moreButtons}
        <Dropdown
          placeholder="Select container"
          className="ml-5 mr-2"
          selectedValue={containerName}
          options={containerNames.map(key => ({label: key, value: key}))}
          onSelect={option => setContainerName(option.value)}
        />
      </>}
    />

    {page.data
      ? <AnnotationPage
        pageNo={pageNo}
        page={page.data}
        onChangePageNo={handleChangePage}
      />
      : <Loading/>
    }</>
}
