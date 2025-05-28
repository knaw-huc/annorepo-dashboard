import {useState} from "react";
import {H1} from "../common/H1.tsx";
import {Button} from "../common/Button.tsx";
import {GlobalQueryEditor} from "./GlobalQueryEditor.tsx";
import {Store} from "../common/icon/Store.tsx";
import {
  CustomQueryEditor,
  defaultCustomQueryForm
} from "./CustomQueryEditor.tsx";
import {ArCustomQueryForm, SearchQuery} from "../../client/ArModel.ts";
import {MR, usePost} from "../../client/query/usePost.tsx";
import {defaultQuery} from "../common/search/QueryModel.ts";
import omit from "lodash/omit";
import noop from "lodash/noop";
import {useQueryClient} from "@tanstack/react-query";
import {invalidateBy} from "../../client/query/useGet.tsx";
import cloneDeep from "lodash/cloneDeep";

export type CustomQueryMode = 'create-global-query' | 'create-custom-query'

export function NewCustomQuery(props: {
  onClose: () => void
}) {
  const queryClient = useQueryClient()

  const [mode, setMode] = useState<CustomQueryMode>('create-global-query')
  const [queryMetadata, setQueryMetadata] = useState<Omit<ArCustomQueryForm, 'query'>>(omit(defaultCustomQueryForm, 'query'));
  const [queryTemplate, setQueryTemplate] = useState<SearchQuery>(cloneDeep(defaultQuery));
  const [globalQuery, setGlobalQuery] = useState<SearchQuery>(cloneDeep(defaultQuery));

  const createCustomQuery: MR<ArCustomQueryForm> = usePost('/global/custom-query')

  const handleSubmitSave = () => {
    const arCustomQueryForm: ArCustomQueryForm = {
      ...queryMetadata,
      // openapi type says string but AR api expects json:
      query: queryTemplate as unknown as string
    };

    createCustomQuery.mutate({
      params: {},
      body: arCustomQueryForm,
    }, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          predicate: query => invalidateBy(query, 'custom-query')
        })
        props.onClose();
      }
    })
  }


  function handleSwitchToCustomQuery() {
    setQueryTemplate(cloneDeep(globalQuery))
    setMode('create-custom-query')
  }

  function switchBackToGlobalQuery() {
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
      customQuery={queryMetadata}
      onChangeCustomQuery={setQueryMetadata}

      queryTemplate={queryTemplate}
      onChangeQueryTemplate={setQueryTemplate}

      isExistingQuery={false}
      onSave={handleSubmitSave}
      onEditQueryTemplate={switchBackToGlobalQuery}
      onClose={props.onClose}

      onSearch={noop}
    />}

  </>
}

