import {useEffect, useState} from "react";
import {H1} from "../common/H1.tsx";
import {Button} from "../common/Button.tsx";
import {GlobalQueryEditor} from "./GlobalQueryEditor.tsx";
import {Store} from "../common/icon/Store.tsx";
import {ArCustomQueryForm, SearchQuery} from "../../client/ArModel.ts";
import {MR, usePost} from "../../client/query/usePost.tsx";
import {defaultQuery} from "../common/search/QueryModel.ts";
import omit from "lodash/omit";
import {useQueryClient} from "@tanstack/react-query";
import {invalidateBy} from "../../client/query/useGet.tsx";
import cloneDeep from "lodash/cloneDeep";
import {Next} from "../common/icon/Next.tsx";
import {Back} from "../common/icon/Back.tsx";
import {CustomQueryEditor} from "./CustomQueryEditor.tsx";
import {toTemplates} from "./toTemplates.ts";
import {toQueryFieldForms} from "../common/search/util/toQueryFieldForms.ts";
import {defaultCustomQueryForm} from "./CustomQueryCallEditor.tsx";
import {toSearchQuery} from "../common/search/util/toSearchQuery.tsx";
import {Warning} from "../common/Warning.tsx";

export type CustomQueryMode = 'create-global-query' | 'create-custom-query'

export function NewCustomQuery(props: {
  onClose: () => void
}) {
  const queryClient = useQueryClient()

  const [mode, setMode] = useState<CustomQueryMode>('create-global-query')
  const [queryMetadata, setQueryMetadata] = useState(omit(defaultCustomQueryForm, 'query'));
  const [hasMetadataError, setMetadataError] = useState<boolean>();
  const [query, setQuery] = useState<SearchQuery>(cloneDeep(defaultQuery));
  const [globalQuery, setGlobalQuery] = useState<SearchQuery>(cloneDeep(defaultQuery));

  const createCustomQuery: MR<ArCustomQueryForm> = usePost('/global/custom-query')

  const handleSubmitSave = () => {
    const arCustomQueryForm: ArCustomQueryForm = {
      ...queryMetadata,
      // openapi type says string but AR api expects json:
      query: query as unknown as string
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
      },
      onError: async (...args) => {
        console.log('onError', args)
      }
    })
  }

  useEffect(() => {
    console.log({createCustomQuery})
  }, [createCustomQuery]);

  function handleSwitchToCustomQuery() {
    setQuery(toSearchQuery(toTemplates(toQueryFieldForms(cloneDeep(globalQuery)))))
    setMode('create-custom-query')
  }

  function handleUpdateQuery(update: SearchQuery) {
    setQuery(update)
  }

  function switchBackToGlobalQuery() {
    setMode('create-global-query')
  }

  const title = mode === 'create-global-query'
    ? 'Create global query'
    : 'Create custom query';

  return <>
    <H1>{title}</H1>
    {createCustomQuery.isError && <Warning
    >{createCustomQuery.error.message}</Warning>}
    {mode === 'create-global-query' && <GlobalQueryEditor
      moreButtons={<>
        <Button
          secondary
          onClick={handleSwitchToCustomQuery}
        >
          <Store className="mr-2"/>
          Store query
        </Button>
      </>}
      query={globalQuery}
      onChange={setGlobalQuery}
    />}
    {mode === 'create-custom-query' && <>
      <CustomQueryEditor
        metadata={queryMetadata}
        onChangeMetadata={setQueryMetadata}
        onMetadataError={() => setMetadataError(true)}
        onClearMetadataError={() => setMetadataError(false)}

        query={query}
        parameterQuery={toSearchQuery(toTemplates(toQueryFieldForms(query)))}
        globalQuery={globalQuery}
        onChangeQuery={handleUpdateQuery}
      />
      <Button
        onClick={switchBackToGlobalQuery}
        secondary
        className="pr-5"
      >
        <Back className="mr-2"/>Edit query
      </Button>
      <Button
        onClick={handleSubmitSave}
        className="ml-3 pl-5"
        disabled={hasMetadataError}
      >
        Save<Next className="ml-2"/>
      </Button>
    </>}
  </>
}

