import {PropsWithChildren, useState} from "react";
import {H1} from "../common/H1.tsx";
import {Button} from "../common/Button.tsx";
import {GlobalQueryDetail} from "./GlobalQueryFormAndResults.tsx";
import {Store} from "../common/icon/Store.tsx";
import {CustomQueryForm, defaultCustomQueryForm} from "./CustomQueryForm.tsx";
import {SearchQuery} from "../../client/ArModel.ts";

export type ContainerSearchProps = {
  customQueryName?: string
}
export type CustomQueryMode = 'create-global-query' | 'create-custom-query'

export function CustomQueryDetail() {

  const [mode, setMode] = useState<CustomQueryMode>('create-global-query')
  const [globalQuery, setGlobalQuery] = useState<SearchQuery>(defaultCustomQueryForm.query);
  const [customQuery, setCustomQuery] = useState<CustomQueryForm>(defaultCustomQueryForm);

  function handleSwitchToCustomQuery() {
    setCustomQuery(customQuery => ({...customQuery, query: globalQuery}))
    setMode('create-custom-query')
  }

  function handleSwitchToGlobalQuery() {
    setGlobalQuery(customQuery.query)
    setMode('create-global-query')
  }

  const title = mode === 'create-global-query'
    ? 'Create global query'
    : 'Create custom query';

  return <>
    <H1>{title}</H1>
    {mode === 'create-global-query' && <GlobalQueryDetail
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
    {mode === 'create-custom-query' && <CustomQueryForm
      form={customQuery}
      onChange={setCustomQuery}
      onClickSearch={handleSwitchToGlobalQuery}
    />
    }

  </>
}

export function Current(props: PropsWithChildren<{}>) {
  return <span
    className="mr-2 font-medium justify-center rounded-md px-3 py-2 text-sm/6 font-semibold border-2 border-slate-200">
    {props.children}
  </span>
}
