import {useState} from "react";
import {H1} from "../common/H1.tsx";
import {Button} from "../common/Button.tsx";
import {GlobalQueryEditor} from "./GlobalQueryEditor.tsx";
import {Store} from "../common/icon/Store.tsx";
import {
  CustomQueryEditor,
  defaultCustomQueryForm
} from "./CustomQueryEditor.tsx";
import {SearchQuery} from "../../client/ArModel.ts";
import {toErrorRecord} from "../common/form/util/toErrorRecord.ts";

export type CustomQueryMode = 'create-global-query' | 'create-custom-query'

export function NewCustomQuery(props: {
  onClose: () => void
}) {

  const [mode, setMode] = useState<CustomQueryMode>('create-global-query')
  const [globalQuery, setGlobalQuery] = useState<SearchQuery>(defaultCustomQueryForm.query);
  const [customQuery, setCustomQuery] = useState(defaultCustomQueryForm);
  const [customQueryErrors, setCustomQueryErrors] = useState(toErrorRecord(defaultCustomQueryForm));

  function handleSwitchToCustomQuery() {
    setCustomQuery(customQuery => ({...customQuery, query: globalQuery}))
    setMode('create-custom-query')
  }

  function switchBackToGlobalQuery() {
    setGlobalQuery(customQuery.query)
    setMode('create-global-query')
  }

  const title = mode === 'create-global-query'
    ? 'Create global query'
    : 'Create custom query';

  return <>
    <H1>{title}</H1>
    {mode === 'create-global-query' && <GlobalQueryEditor
      moreButtons={<>
        <Button
          secondary
          className=""
          onClick={handleSwitchToCustomQuery}
        >
          <Store className="mr-2"/>
          Store
        </Button>
      </>}
      query={globalQuery}
      onChange={setGlobalQuery}
    />
    }
    {mode === 'create-custom-query' && <CustomQueryEditor
      form={customQuery}
      errors={customQueryErrors}
      onChange={setCustomQuery}
      onError={setCustomQueryErrors}
      onEditQuery={switchBackToGlobalQuery}
      onClose={props.onClose}
    />}

  </>
}

