import {SearchEditor} from "../common/search/SearchEditor.tsx";
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
import {debounce} from "lodash";

export function GlobalQueryEditor(props: {
  query: SearchQuery
  onChange: (update: SearchQuery) => void
  moreButtons?: ReactNode
}) {
  const {query, onChange} = props;
  const [pageNo, setPageNo] = useState(0);

  /**
   * TODO:
   *  - global values <--> custom query params
   *  - create custom query
   *  - show results of existing custom query
   *  - edit query of custom query, to create new custom query
   */
  const myContainers = useGet('/my/containers') as QR<ArMyContainers>
  const containerNames = getContainerNames(myContainers.data)
  const fields = useContainerFields(containerNames[0] ?? '')
  const fieldNames = fields.data ? Object.keys(fields.data) : [];

  const {page} = useGlobalSearch(query, pageNo);

  if (!page.isSuccess) {
    return <StatusMessage request={page}/>;
  }

  const handleChangePage = (update: string) => {
    setPageNo(toPageNo(update))
  }

  const handleSubmitQuery = (query: SearchQuery) => {
    onChange(query);
  }

  return <>
    <SearchEditor
      query={query}
      fieldNames={fieldNames}
      searchError={page.error}
      onChangeQuery={debounce(handleSubmitQuery, 500)}
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