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
import {toQueryFieldForm} from "../../store/query/util/toQueryFieldForm.ts";
import {mapValues} from "lodash";
import {SearchButton} from "../common/search/button/SearchButton.tsx";
import {hasErrors} from "../../store/query/util/hasErrors.ts";
import {AddSubQueryButton} from "../common/search/button/AddSubQueryButton.tsx";

export type ContainerSearchProps = {
  containerName: string,
  onClose: () => void
}

export function ContainerSearch(props: ContainerSearchProps) {

  const {containerName} = props;
  const [pageNo, setPageNo] = useState(0);

  const container = useContainer(containerName)
  const {initWithQuery, addForm, forms, errors} = useStore()
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
    if (hasErrors(errors)) {
      return;
    }
    setSubmitted({containerName, query, pageNo});
  }

  function handleAddSubQuery() {
    const newQueryEntry = Object.entries(defaultQuery)[0];
    const form = toQueryFieldForm(newQueryEntry)
    const error = mapValues(form, () => '');
    const param = false
    addForm({form, error, param})
  }

  const searchDisabled = !!search.error || !forms.length || hasErrors(errors);

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
        canDelete={true}
      />
      : <Loading/>
    }
  </>

}
