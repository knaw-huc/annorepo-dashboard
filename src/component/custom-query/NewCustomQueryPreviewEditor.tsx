import {QueryEditor} from "../common/search/QueryEditor.tsx";
import {AnnotationPage} from "../annotation/AnnotationPage.tsx";
import {Loading} from "../common/Loading.tsx";
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
import {Dropdown} from "../common/form/Dropdown.tsx";

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
    if(!isInit && containerNames.length && query) {
      setInit(true)
      const containerNameUpdate = containerNames[0];
      setSubmitted({query, pageNo, containerName: containerNameUpdate})
      setContainerName(containerNameUpdate)
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
