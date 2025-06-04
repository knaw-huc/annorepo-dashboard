import {Loading} from "../common/Loading.tsx";
import {useContainerSearch} from "../../client/endpoint/useContainerSearch.tsx";
import {useContainer} from "../../client/endpoint/useContainer.tsx";
import {useEffect, useState} from "react";
import {toPageNo} from "../../util/toPageNo.ts";
import {AnnotationPage} from "../annotation/AnnotationPage.tsx";
import {ErrorMessage} from "../common/ErrorMessage.tsx";
import {StatusMessage} from "../common/StatusMessage.tsx";
import {useContainerFields} from "../../client/endpoint/useContainerFields.tsx";
import {SearchEditor} from "../common/search/SearchEditor.tsx";
import {SearchQuery} from "../../client/ArModel.ts";
import {H1} from "../common/H1.tsx";
import {debounce} from "lodash";
import {defaultQuery} from "../common/search/QueryModel.ts";

export type ContainerSearchProps = {
  name: string,
  onClose: () => void
}

export function ContainerSearch(props: ContainerSearchProps) {

  const {name} = props;
  const [pageNo, setPageNo] = useState(0);

  const container = useContainer(name)
  const [query, setQuery] = useState<SearchQuery>(defaultQuery);
  const {search, page} = useContainerSearch(name, query, pageNo);
  const {data: containerFields} = useContainerFields(name);

  useEffect(() => {
    const containerPageId = container.data?.first.id;
    if (containerPageId) {
      setPageNo(toPageNo(containerPageId))
    }
  }, [container]);

  const error = search.error || page.error
  if (error) {
    return <ErrorMessage error={error}/>;
  }
  if (!container.isSuccess || !page.isSuccess) {
    return <StatusMessage requests={[container, page]}/>;
  }

  const fieldNames = containerFields ? Object.keys(containerFields) : [];

  const handleChangePage = (update: string) => {
    setPageNo(toPageNo(update))
  }

  return <>
    <H1>Search annotations</H1>
    <SearchEditor
      query={query}
      fieldNames={fieldNames}
      searchError={search.error}
      onChangeQuery={debounce(setQuery, 500)}
      onSubmitQuery={setQuery}
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
