import {useEffect, useState} from "react";
import {H1} from "../common/H1.tsx";
import {Button} from "../common/Button.tsx";
import {NewCustomQueryPreviewEditor} from "./NewCustomQueryPreviewEditor.tsx";
import {Store} from "../common/icon/Store.tsx";
import {ArCustomQueryForm} from "../../client/ArModel.ts";
import {MR, usePost} from "../../client/query/usePost.tsx";
import {useQueryClient} from "@tanstack/react-query";
import {invalidateBy} from "../../client/query/useGet.tsx";
import {Next} from "../common/icon/Next.tsx";
import {Back} from "../common/icon/Back.tsx";
import {
  NewCustomQueryMetadataAndTemplateEditor
} from "./NewCustomQueryMetadataAndTemplateEditor.tsx";
import {defaultCustomQueryForm} from "./CustomQueryCallEditor.tsx";
import {Warning} from "../common/Warning.tsx";
import {useSearchQuery} from "../../store/query/hooks/useSearchQuery.ts";
import {defaultParams, defaultTemplate} from "../common/search/QueryModel.ts";
import {useStore} from "../../store/useStore.ts";
import {hasErrors} from "../../store/query/util/hasErrors.ts";

export type CustomQueryMode = 'create-global-query' | 'create-custom-query'

export function NewCustomQueryEditor(props: {
  onClose: () => void
}) {

  const {initWithTemplate, errors} = useStore()

  const asTemplate = true;
  const query = useSearchQuery(asTemplate)
  const queryClient = useQueryClient()

  const [mode, setMode] = useState<CustomQueryMode>('create-global-query')
  const [queryMetadata, setQueryMetadata] = useState(defaultCustomQueryForm);
  const [hasMetadataError, setMetadataError] = useState<boolean>();

  const [containerName, setContainerName] = useState('');


  useEffect(() => {
    initWithTemplate(defaultTemplate, defaultParams)
  }, []);

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
        console.warn('onError', args)
      }
    })
  }

  const title = mode === 'create-global-query'
    ? 'Create custom query'
    : 'Store custom query';


  return <>
    <H1>{title}</H1>
    {createCustomQuery.isError && <Warning>
      {createCustomQuery.error.message}
    </Warning>}
    {mode === 'create-global-query' && <NewCustomQueryPreviewEditor
      containerName={containerName}
      onSetContainerName={setContainerName}
      moreButtons={
        <Button
          secondary
          className="mr-3"
          onClick={() => setMode('create-custom-query')}
          disabled={hasErrors(errors)}
        >
          <Store className="mr-2"/>
          Store as custom query
        </Button>
      }
    />}
    {mode === 'create-custom-query' && <>
      <NewCustomQueryMetadataAndTemplateEditor
        metadata={queryMetadata}
        onChangeMetadata={setQueryMetadata}
        onMetadataError={() => setMetadataError(true)}
        onClearMetadataError={() => setMetadataError(false)}
      />
      <Button
        onClick={() => setMode('create-global-query')}
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

