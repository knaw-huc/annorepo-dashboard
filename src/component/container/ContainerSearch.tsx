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
import {
  ContainerSearchArgs,
  useContainerSearch
} from "../../client/endpoint/useContainerSearch.tsx";
import {toComparisonSubQuery} from "../../store/query/util/toComparisonSubQuery.ts";
import {mapValues} from "lodash";
import {SearchButton} from "../common/search/button/SearchButton.tsx";
import {hasErrors} from "../../store/query/util/hasErrors.ts";
import {AddSubQueryButton} from "../common/search/button/AddSubQueryButton.tsx";
import {defaultQuery} from "../../model/query/defaultQuery.ts";
import {SubqueryToAdd} from "../../store/query/SubqueryToAdd.ts";

export type ContainerSearchProps = {
  containerName: string,
  onClose: () => void
}

export function ContainerSearch(props: ContainerSearchProps) {

  const {containerName} = props;
  const [pageNo, setPageNo] = useState(0);

  const container = useContainer(containerName)
  const {initWithQuery, addSubquery, subqueries} = useStore()
  const [isInit, setInit] = useState(false)
  const query = useSearchQuery()

  const [submitted, setSubmitted] = useState<ContainerSearchArgs>({
    containerName,
    query,
    pageNo
  })

  useEffect(() => {
    if (isInit) {
      return
    }
    setInit(true)
    const query = defaultQuery;
    initWithQuery(query)
    setSubmitted({containerName, query, pageNo})
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (hasErrors(subqueries)) {
      return;
    }
    setSubmitted({containerName, query, pageNo});
  }

  function handleAddSubQuery() {
    const newQueryEntry = Object.entries(defaultQuery)[0];
    const form = toComparisonSubQuery(newQueryEntry)
    const errors = mapValues(form, () => '');
    const param = false
    const toAdd: SubqueryToAdd = {subquery: {type: "comparison", form, errors, param}}
    addSubquery(toAdd)
  }

  const searchDisabled = !!search.error || !subqueries.length || hasErrors(subqueries);

  if (!container.isSuccess || !page.isSuccess) {
    return <StatusMessage requests={[container, page]}/>;
  }
  return <>
    <H1>Search annotations</H1>
    <QueryEditor
      containerName={containerName}
    />
    <div className="mb-2">
      <AddSubQueryButton
        onClick={handleAddSubQuery}
        disabled={searchDisabled}
      />
      <span className="ml-3"><SearchButton
        onClick={handleSubmitSearch}
        disabled={searchDisabled}
      /></span>
    </div>
    {page
      ? <AnnotationPage
        pageNo={pageNo}
        page={page.data}
        onChangePageNo={handleChangePage}
        canDelete
      />
      : <Loading/>
    }
  </>

}
