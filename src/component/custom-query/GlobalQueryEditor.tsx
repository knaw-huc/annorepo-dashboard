import {QueryEditor} from "../common/search/QueryEditor.tsx";
import {AnnotationPage} from "../annotation/AnnotationPage.tsx";
import {Loading} from "../common/Loading.tsx";
import {ReactNode, useEffect, useState} from "react";
import {QR, useGet} from "../../client/query/useGet.tsx";
import {ArMyContainers, SearchQuery} from "../../client/ArModel.ts";
import {useGlobalSearch} from "../../client/endpoint/useGlobalSearch.tsx";
import {StatusMessage} from "../common/StatusMessage.tsx";
import {toPageNo} from "../../util/toPageNo.ts";
import {getContainerNames} from "../../client/endpoint/getContainerNames.tsx";
import {useContainerFields} from "../../client/endpoint/useContainerFields.tsx";
import {useSearchQuery} from "../../store/query/hooks/useSearchQuery.ts";

export function GlobalQueryEditor(props: {
  moreButtons?: ReactNode
}) {
  const [pageNo, setPageNo] = useState(0);

  const myContainers = useGet('/my/containers') as QR<ArMyContainers>
  const containerNames = getContainerNames(myContainers.data)
  const fields = useContainerFields(containerNames[0] ?? '')

  const [submittedQuery, setSubmittedQuery] = useState<SearchQuery>()
  const [isInit, setInit] = useState<boolean>()
  const query = useSearchQuery()

  useEffect(() => {
    if(query && !isInit) {
      setSubmittedQuery(query)
      setInit(true)
    }
  }, [query]);

  const {page} = useGlobalSearch(submittedQuery, pageNo);

  const handleChangePage = (update: string) => {
    setPageNo(toPageNo(update))
  }

  if (!page.isSuccess || !fields.isSuccess) {
    return <StatusMessage requests={[page, fields]}/>;
  }

  return <>
    <QueryEditor
      containerName={containerNames[0]}
      searchError={page.error}
      onSubmit={() => setSubmittedQuery(query)}
      moreButtons={props.moreButtons}
    />
    {page
      ? <AnnotationPage
        pageNo={pageNo}
        page={page.data}
        onChangePageNo={handleChangePage}
      />
      : <Loading/>
    }</>
}