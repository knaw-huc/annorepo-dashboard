import { useEffect, useState } from "react";
import { H1 } from "../common/H1.tsx";
import { NewCustomQueryPreviewEditor } from "./NewCustomQueryPreviewEditor.tsx";
import { ArCustomQueryForm } from "../../model/ArModel.ts";
import { usePost } from "../../client/query/usePost.tsx";
import { useQueryClient } from "@tanstack/react-query";
import { keyEquals } from "../../client/query/useGet.tsx";
import { NewCustomQueryMetadataAndTemplateEditor } from "./NewCustomQueryMetadataAndTemplateEditor.tsx";
import { Warning } from "../common/Warning.tsx";
import { useSearchQuery } from "../../store/query/hook/useSearchQuery.ts";
import { useStore } from "../../store/useStore.ts";
import { MR } from "../../client/query/MR.tsx";
import {
  defaultParams,
  defaultTemplate,
} from "../../model/query/defaultQuery.ts";
import { defaultCustomQueryMetadata } from "./defaultCustomQueryMetadata.ts";
import { ContainerDropdown } from "./ContainerDropdown.tsx";
import noop from "lodash/noop";

export type CustomQueryMode = "create-global-query" | "create-custom-query";

export function NewCustomQueryEditor(props: { onClose: () => void }) {
  const { initWithTemplate } = useStore();

  const asTemplate = true;
  const query = useSearchQuery(asTemplate);
  const queryClient = useQueryClient();

  const [mode, setMode] = useState<CustomQueryMode>("create-global-query");
  const [queryMetadata, setQueryMetadata] = useState(
    defaultCustomQueryMetadata,
  );

  const [containerName, setContainerName] = useState("");

  useEffect(() => {
    initWithTemplate(defaultTemplate, defaultParams);
  }, []);

  const createCustomQuery: MR<ArCustomQueryForm> = usePost(
    "/global/custom-query",
  );

  const handleSubmitSave = () => {
    const arCustomQueryForm: ArCustomQueryForm = {
      ...queryMetadata,
      // openapi type says string but AR api expects json:
      query: query as unknown as string,
    };

    createCustomQuery.mutate(
      {
        params: {},
        body: arCustomQueryForm,
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            predicate: (query) => keyEquals(query, "/global/custom-query"),
          });
          props.onClose();
        },
        onError: async (...args) => {
          console.warn("onError", args);
        },
      },
    );
  };

  return (
    <>
      <div className="flex justify-between w-full my-8 mx-auto">
        <H1>Create custom query</H1>
      </div>
      {createCustomQuery.isError && (
        <Warning>{createCustomQuery.error.message}</Warning>
      )}

      {mode === "create-global-query" && (
        <>
          <NewCustomQueryPreviewEditor
            containerName={containerName}
            onSetContainerName={setContainerName}
            onSave={() => setMode("create-custom-query")}
          />
        </>
      )}
      {mode === "create-custom-query" && (
        <>
          <div className="flex justify-between w-full my-8 mx-auto">
            <ContainerDropdown
              selected={containerName}
              disabled={true}
              onSelect={noop}
            />
          </div>
          <NewCustomQueryMetadataAndTemplateEditor
            metadata={queryMetadata}
            onChangeMetadata={(m) => {
              console.log(NewCustomQueryEditor.name, "onChangeMetadata", m);
              setQueryMetadata(m);
            }}
            handleSubmitSave={handleSubmitSave}
            handleCancel={() => setMode("create-global-query")}
          />
        </>
      )}
    </>
  );
}
