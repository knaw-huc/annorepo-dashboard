import {H1} from "../common/H1.tsx";
import {CustomQueryEditor} from "./CustomQueryEditor.tsx";
import {useCustomQuery} from "../../client/endpoint/useCustomQuery.tsx";
import {StatusMessage} from "../common/StatusMessage.tsx";
import noop from "lodash/noop";
import {useEffect, useState} from "react";
import omit from "lodash/omit";
import {SearchQuery} from "../../client/ArModel.ts";

export function CustomQueryDetail(props: {
  name: string
  onClose: () => void
}) {
  const {name, onClose} = props;

  const customQuery = useCustomQuery(name)

  const [query, setQuery] = useState<SearchQuery>();

  useEffect(() => {
    if(customQuery.data) {
      setQuery(JSON.parse(customQuery.data.queryTemplate));
    }
  }, [customQuery.data]);

  if(!customQuery.data || !query) {
    return <StatusMessage request={customQuery} />
  }
  return <>
    <H1>{name}</H1>
    <CustomQueryEditor
      metadata={omit(customQuery.data, 'query')}
      template={JSON.parse(customQuery.data.queryTemplate)}

      onChangeMetadata={noop}
      query={query}
      onChangeQuery={setQuery}

      isExistingQuery={true}
      onEditQueryTemplate={noop}
      onSearch={() => console.log('TODO: handle search!!!', {query})}
      onClose={onClose}

      onSave={noop}
    />
  </>
}

