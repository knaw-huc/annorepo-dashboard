import {useEffect, useState} from "react";
import {H1} from "../common/H1.tsx";
import {Button} from "../common/Button.tsx";
import {NewCustomQueryPreviewEditor} from "./NewCustomQueryPreviewEditor.tsx";
import {ArCustomQueryForm} from "../../model/ArModel.ts";
import {usePost} from "../../client/query/usePost.tsx";
import {useQueryClient} from "@tanstack/react-query";
import {invalidateBy} from "../../client/query/useGet.tsx";
import {Next} from "../common/icon/Next.tsx";
import {Back} from "../common/icon/Back.tsx";
import {
  NewCustomQueryMetadataAndTemplateEditor
} from "./NewCustomQueryMetadataAndTemplateEditor.tsx";
import {Warning} from "../common/Warning.tsx";
import {useSearchQuery} from "../../store/query/hooks/useSearchQuery.ts";
import {useStore} from "../../store/useStore.ts";
import {MR} from "../../client/query/MR.tsx";
import {
  defaultParams,
  defaultTemplate
} from "../../model/query/defaultQuery.ts";
import {defaultCustomQueryMetadata} from "./defaultCustomQueryMetadata.ts";

export type CustomQueryMode = 'create-global-query' | 'create-custom-query'

export function NewCustomQueryEditor(props: {
  onClose: () => void
}) {

  const {initWithTemplate} = useStore()

  const asTemplate = true;
  const query = useSearchQuery(asTemplate)
  const queryClient = useQueryClient()

  const [mode, setMode] = useState<CustomQueryMode>('create-global-query')
  const [queryMetadata, setQueryMetadata] = useState(defaultCustomQueryMetadata);
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
    <div className="">
      {mode === 'create-custom-query' &&
        <Button
          onClick={() => setMode('create-global-query')}
          secondary
          className="pr-5"
        >
          <Back className="mr-2"/>Edit query
        </Button>}
    </div>
    {mode === 'create-global-query' && <>
      <NewCustomQueryPreviewEditor
        containerName={containerName}
        onSetContainerName={setContainerName}
        onSave={() => setMode('create-custom-query')}
      />
    </>}
    {mode === 'create-custom-query' && <>
      <NewCustomQueryMetadataAndTemplateEditor
        metadata={queryMetadata}
        onChangeMetadata={setQueryMetadata}
        onMetadataError={() => setMetadataError(true)}
        onClearMetadataError={() => setMetadataError(false)}
      />
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

