import {H1} from "../common/H1.tsx";
import {
  CustomQueryEditor,
  defaultCustomQueryForm
} from "./CustomQueryEditor.tsx";
import {useCustomQuery} from "../../client/endpoint/useCustomQuery.tsx";
import {StatusMessage} from "../common/StatusMessage.tsx";
import noop from "lodash/noop";
import {useState} from "react";
import {ArCustomQueryForm, SearchQuery} from "../../client/ArModel.ts";
import omit from "lodash/omit";
import cloneDeep from "lodash/cloneDeep";
import {defaultQuery} from "../common/search/QueryModel.ts";

export function CustomQueryDetail(props: {
  name: string
  onClose: () => void
}) {
  const {name, onClose} = props;
  const customQuery = useCustomQuery(name)

  const [queryMetadata, setQueryMetadata] = useState<Omit<ArCustomQueryForm, 'query'>>(omit(defaultCustomQueryForm, 'query'));
  const [queryTemplate, setQueryTemplate] = useState<SearchQuery>(cloneDeep(defaultQuery));

  if(!customQuery.data) {
    return <StatusMessage request={customQuery} />
  }
  return <>
    <H1>{name}</H1>
    <CustomQueryEditor
      customQuery={queryMetadata}
      queryTemplate={queryTemplate}

      onChangeCustomQuery={setQueryMetadata}
      onChangeQueryTemplate={setQueryTemplate}

      isExistingQuery={true}
      onEditQueryTemplate={noop}
      onSearch={() => console.log('TODO: handle search!!!', {queryMetadata, queryTemplate})}
      onClose={onClose}

      onSave={noop}
    />
  </>
}

