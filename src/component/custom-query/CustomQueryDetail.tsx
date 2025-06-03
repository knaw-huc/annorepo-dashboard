import {H1} from "../common/H1.tsx";
import {CustomQueryEditor} from "./CustomQueryEditor.tsx";
import {useCustomQuery} from "../../client/endpoint/useCustomQuery.tsx";
import {StatusMessage} from "../common/StatusMessage.tsx";
import noop from "lodash/noop";
import {useEffect, useState} from "react";
import omit from "lodash/omit";
import {SearchQuery} from "../../client/ArModel.ts";
import {mapValues} from "lodash";

export function CustomQueryDetail(props: {
  name: string
  onClose: () => void
}) {
  const {name, onClose} = props;

  const [query, setQuery] = useState<SearchQuery>();
  const [queryParameters, setQueryParameters] = useState<Record<string, string>>({})

  const customQuery = useCustomQuery(
    name,
    queryParameters
  )

  useEffect(() => {
    if(customQuery.data) {
      setQuery(JSON.parse(customQuery.data.queryTemplate));
    }
  }, [customQuery.data]);

  function handleSearch() {
    if(query) {
      setQueryParameters(mapValues(query, v => `${v}`))
    }
    return console.log('TODO: handle search!!!', {query});
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

      isExistingQuery={true}
      onEditQueryTemplate={noop}
      onSearch={handleSearch}
      onClose={onClose}

      onSave={noop}
    />
  </>
}

