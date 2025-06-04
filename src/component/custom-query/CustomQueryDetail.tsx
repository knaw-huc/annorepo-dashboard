import {H1} from "../common/H1.tsx";
import {CustomQueryEditor} from "./CustomQueryEditor.tsx";
import {
  useContainerCustomQueryCall,
  useCustomQuery
} from "../../client/endpoint/useCustomQuery.tsx";
import {StatusMessage} from "../common/StatusMessage.tsx";
import noop from "lodash/noop";
import {useEffect, useState} from "react";
import omit from "lodash/omit";
import {toCustomQueryParameters} from "./toCustomQueryParameters.ts";
import {ArMyContainers, SearchQuery} from "../../client/ArModel.ts";
import {toQueryFieldForms} from "../common/search/util/toQueryFieldForms.ts";
import {Button} from "../common/Button.tsx";
import {Next} from "../common/icon/Next.tsx";
import {Dropdown} from "../common/form/Dropdown.tsx";
import {QR, useGet} from "../../client/query/useGet.tsx";
import {getContainerNames} from "../../client/endpoint/getContainerNames.tsx";
import {AnnotationPage} from "../annotation/AnnotationPage.tsx";
import {toPageNo} from "../../util/toPageNo.ts";

export function CustomQueryDetail(props: {
  name: string
  onClose: () => void
}) {
  const {name, onClose} = props;

  const [query, setQuery] = useState<SearchQuery>();
  const [queryParameters, setQueryParameters] = useState<Record<string, string>>({})
  const [hasQueryError, setQueryError] = useState<boolean>();
  const [selectedContainer, setSelectedContainer] = useState('')

  const customQuery = useCustomQuery(name)
  const customQueryCall = useContainerCustomQueryCall(name, selectedContainer, queryParameters)
  const [pageNo, setPageNo] = useState(0)
  const myContainers = useGet('/my/containers') as QR<ArMyContainers>

  const containerNames = getContainerNames(myContainers.data)

  useEffect(() => {
    if(customQuery.data) {
      setQuery(JSON.parse(customQuery.data.queryTemplate));
    }
  }, [customQuery.data]);

  function handleSearch() {
    if(!customQuery.data) {
      return;
    }
    if(query) {
      const forms = toQueryFieldForms(query)
      const templateForms = toQueryFieldForms(JSON.parse(customQuery.data.queryTemplate))
      const newQueryParams = toCustomQueryParameters(forms, templateForms, customQuery.data.parameters);
      setQueryParameters(newQueryParams)
    }
  }

  const handleChangePage = (update: string) => {
    setPageNo(toPageNo(update))
  }

  if(!customQuery.data || !query) {
    return <StatusMessage request={customQuery} />
  }

  return <>
    <H1>{name}</H1>
    <CustomQueryEditor
      metadata={omit(customQuery.data, 'query')}
      onChangeMetadata={noop}

      template={JSON.parse(customQuery.data.queryTemplate)}
      query={query}
      onChangeQuery={setQuery}
      onError={() => setQueryError(true)}
      onClearError={() => setQueryError(false)}
      isExistingQuery={true}
      parameters={customQuery.data.parameters}
      onEditQueryTemplate={noop}
      onClose={onClose}

      onSave={noop}
    />
    <div className="mb-5">
      <Dropdown
        className="mr-3"
        selectedValue={selectedContainer}
        options={containerNames.map(key => ({ label: key, value: key }))}
        onSelect={option => setSelectedContainer(option.value)}
      />
      <Button
        onClick={handleSearch}
        className="pl-5"
        disabled={hasQueryError || !selectedContainer}
      >
        Search<Next className="ml-2"/>
      </Button>
    </div>
    <div className="max-w-[100vw] font-mono whitespace-pre-wrap">
      {!!customQueryCall.data && <AnnotationPage
          pageNo={pageNo}
          page={customQueryCall.data}
          onChangePageNo={handleChangePage}
        />
      }
    </div>
  </>
}

