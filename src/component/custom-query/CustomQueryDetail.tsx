import {Loading} from "../common/Loading.tsx";
import {useState} from "react";
import {toPageNo} from "../../util/toPageNo.ts";
import {AnnotationPage} from "../annotation/AnnotationPage.tsx";
import {StatusMessage} from "../common/StatusMessage.tsx";
import {
  ArCustomQueryForm,
  ArMyContainers,
  SearchQuery
} from "../../client/ArModel.ts";
import {SearchForm} from "../common/search/SearchForm.tsx";
import {useContainerFields} from "../../client/endpoint/useContainerFields.tsx";
import {QR, useGet} from "../../client/query/useGet.tsx";
import {getContainerNames} from "../../client/endpoint/getContainerNames.tsx";
import {useGlobalSearch} from "../../client/endpoint/useGlobalSearch.tsx";
import {H1} from "../common/H1.tsx";
import {Hint} from "../common/Hint.tsx";

export type ContainerSearchProps = {
  customQueryForm: ArCustomQueryForm
  onClose: () => void
}

export function CustomQueryDetail(props: ContainerSearchProps) {

  const [pageNo, setPageNo] = useState(0);

  // TODO: query params <--> global values?
  const [query, setQuery] = useState<SearchQuery>(props.customQueryForm.query);
  const myContainers = useGet('/my/containers') as QR<ArMyContainers>

  // TODO: which fields to use? Multiple containers?
  const containerNames = getContainerNames(myContainers.data)
  const fields = useContainerFields(containerNames[0] ?? '')
  const fieldNames = fields ? Object.keys(fields) : [];

  const {page} = useGlobalSearch(query, pageNo);

  if (!page.isSuccess) {
    return <StatusMessage request={page}/>;
  }

  const handleChangePage = (update: string) => {
    setPageNo(toPageNo(update))
  }

  const handleSubmitQuery = (query: SearchQuery) => {
    console.log('handleSubmitQuery', {query})
    setQuery(query);
  }

  return <>
    <H1>{props.customQueryForm.label} <Hint>custom query</Hint></H1>
    <SearchForm
      query={query}
      fieldNames={fieldNames}
      searchError={page.error}
      onSubmitQuery={handleSubmitQuery}
    />
    {page
      ? <AnnotationPage
        pageNo={pageNo}
        page={page.data}
        onChangePageNo={handleChangePage}
      />
      : <Loading/>
    }
  </>
}
