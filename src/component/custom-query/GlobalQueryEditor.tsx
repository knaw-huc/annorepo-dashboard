import {QueryEditor} from "../common/search/QueryEditor.tsx";
import {AnnotationPage} from "../annotation/AnnotationPage.tsx";
import {Loading} from "../common/Loading.tsx";
import {ReactNode, useState} from "react";
import {QR, useGet} from "../../client/query/useGet.tsx";
import {ArMyContainers} from "../../client/ArModel.ts";
import {useGlobalSearch} from "../../client/endpoint/useGlobalSearch.tsx";
import {StatusMessage} from "../common/StatusMessage.tsx";
import {toPageNo} from "../../util/toPageNo.ts";
import {getContainerNames} from "../../client/endpoint/getContainerNames.tsx";
import {useContainerFields} from "../../client/endpoint/useContainerFields.tsx";
import {useSearchQuery} from "../../store/query/hooks/useSearchQuery.ts";

export function GlobalQueryEditor(props: {
  onSearch: () => void
  moreButtons?: ReactNode
}) {
  const [pageNo, setPageNo] = useState(0);

  const myContainers = useGet('/my/containers') as QR<ArMyContainers>
  const containerNames = getContainerNames(myContainers.data)
  const fields = useContainerFields(containerNames[0] ?? '')
  const fieldNames = fields.data ? Object.keys(fields.data) : [];

  const query = useSearchQuery()
  const {page} = useGlobalSearch(query, pageNo);

  const handleChangePage = (update: string) => {
    setPageNo(toPageNo(update))
  }

  if (!page.isSuccess) {
    return <StatusMessage request={page}/>;
  }

  return <>
    <QueryEditor
      fieldNames={fieldNames}
      searchError={page.error}
      onSubmit={props.onSearch}
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