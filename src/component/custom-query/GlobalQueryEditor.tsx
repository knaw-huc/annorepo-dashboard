import {QueryEditor} from "../common/search/QueryEditor.tsx";
import {AnnotationPage} from "../annotation/AnnotationPage.tsx";
import {Loading} from "../common/Loading.tsx";
import {ReactNode, useState} from "react";
import {QR, useGet} from "../../client/query/useGet.tsx";
import {ArMyContainers, SearchQuery} from "../../client/ArModel.ts";
import {useGlobalSearch} from "../../client/endpoint/useGlobalSearch.tsx";
import {StatusMessage} from "../common/StatusMessage.tsx";
import {toPageNo} from "../../util/toPageNo.ts";
import {getContainerNames} from "../../client/endpoint/getContainerNames.tsx";
import {useContainerFields} from "../../client/endpoint/useContainerFields.tsx";

export function GlobalQueryEditor(props: {
  query: SearchQuery
  onSearch: (update: SearchQuery) => void
  moreButtons?: ReactNode
}) {
  const {query, onSearch} = props;
  const [pageNo, setPageNo] = useState(0);

  const myContainers = useGet('/my/containers') as QR<ArMyContainers>
  const containerNames = getContainerNames(myContainers.data)
  const fields = useContainerFields(containerNames[0] ?? '')
  const fieldNames = fields.data ? Object.keys(fields.data) : [];

  const {page} = useGlobalSearch(query, pageNo);

  const handleChangePage = (update: string) => {
    setPageNo(toPageNo(update))
  }

  const handleSubmitQuery = (query: SearchQuery) => {
    onSearch(query);
  }

  if (!page.isSuccess) {
    return <StatusMessage request={page}/>;
  }

  return <>
    <QueryEditor
      query={query}
      fieldNames={fieldNames}
      searchError={page.error}
      onChangeQuery={handleSubmitQuery}
      onSubmitQuery={handleSubmitQuery}
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