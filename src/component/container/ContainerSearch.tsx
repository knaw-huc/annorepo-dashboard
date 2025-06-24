import {Loading} from "../common/Loading.tsx";
import {useContainer} from "../../client/endpoint/useContainer.tsx";
import {useEffect, useState} from "react";
import {toPageNo} from "../../util/toPageNo.ts";
import {AnnotationPage} from "../annotation/AnnotationPage.tsx";
import {StatusMessage} from "../common/StatusMessage.tsx";
import {QueryEditor} from "../common/search/QueryEditor.tsx";
import {H1} from "../common/H1.tsx";
import {useSearchQuery} from "../../store/query/hooks/useSearchQuery.ts";
import {useStore} from "../../store/useStore.ts";
import {defaultQuery} from "../common/search/QueryModel.ts";
import {
  ContainerSearchArgs,
  useContainerSearch
} from "../../client/endpoint/useContainerSearch.tsx";

export type ContainerSearchProps = {
  containerName: string,
  onClose: () => void
}

export function ContainerSearch(props: ContainerSearchProps) {

  const {containerName} = props;
  const [pageNo, setPageNo] = useState(0);

  const container = useContainer(containerName)
  const {initWithQuery} = useStore()
  const [isInit, setInit] = useState(false)
  const query = useSearchQuery()

  const [submitted, setSubmitted] = useState<ContainerSearchArgs>({
    containerName,
    query,
    pageNo
  })

  useEffect(() => {
    if(isInit) {
      return
    }
    setInit(true)
    const query = defaultQuery;
    initWithQuery(query)
    setSubmitted({containerName, query, pageNo})
  }, [isInit]);

  const {search, page} = useContainerSearch(submitted);

  useEffect(() => {
    const containerPageId = container.data?.first.id;
    if (containerPageId) {
      setPageNo(toPageNo(containerPageId))
    }
  }, [container.data?.first.id]);

  const handleChangePage = (update: string) => {
    setPageNo(toPageNo(update))
  }

  function handleSubmitSearch() {
    setSubmitted({containerName, query, pageNo});
  }

  if (!container.isSuccess || !page.isSuccess) {
    return <StatusMessage requests={[container, page]}/>;
  }

  return <>
    <H1>Search annotations</H1>
    <QueryEditor
      containerName={containerName}
      searchError={search.error}
      onSubmit={handleSubmitSearch}
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
