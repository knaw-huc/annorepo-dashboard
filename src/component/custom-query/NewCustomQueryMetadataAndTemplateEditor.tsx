import { ArCustomQueryForm } from "../../model/ArModel.ts";
import { H2 } from "../common/H2.tsx";
import { CustomQueryMetadataEditor } from "./CustomQueryMetadataEditor.tsx";
import { useEffect, useState } from "react";
import { isEmpty, PropertyName, values } from "lodash";
import { toErrorRecord } from "../../store/query/util/error/toErrorRecord.ts";
import { hasError } from "../../store/query/util/error/hasError.ts";
import { useStore } from "../../store/useStore.ts";
import { toParamName } from "../../store/query/util/toParamName.ts";
import { CustomQueryMetadataForm } from "./model/CustomQueryMetadataForm.ts";
import { getOrThrow } from "../../store/query/util/path/getOrThrow.ts";

import { CustomQueryTemplateEditor } from "./CustomQueryTemplateEditor.tsx";
import { usePageLayout } from "../common/PageLayoutContext.tsx";
import { NeutralButton } from "../common/NeutralButton.tsx";

/**
 * Allow creating a new custom query
 */
export function NewCustomQueryMetadataAndTemplateEditor(props: {
  metadata: Omit<ArCustomQueryForm, "query">;
  onChangeMetadata: (query: Omit<ArCustomQueryForm, "query">) => void;
  handleSubmitSave: () => void;
  handleCancel: () => void;
}) {
  const { metadata, onChangeMetadata } = props;

  const { subqueries, updateComparisonSubquery } = useStore();
  const [metadataForm, setMetadataForm] = useState(metadata);
  const [metadataErrors, setMetadataErrors] = useState(toErrorRecord(metadata));
  const [hasMetadataError, setMetadataError] = useState<boolean>();

  function handleParameterChange(path: PropertyName[], isParam: boolean) {
    const form = getOrThrow(subqueries, path).form;
    const update = isParam ? toParamName(form, path) : false;
    updateComparisonSubquery({ path, param: update });
  }

  useEffect(() => {
    setMetadataError(hasError(metadataErrors));
  }, [metadataErrors]);

  const handleChangeMetadata = (update: CustomQueryMetadataForm) => {
    setMetadataForm(update);
    const hasErrors = values(metadataErrors).some((field) => !isEmpty(field));
    if (!hasErrors) {
      onChangeMetadata(update);
    }
  };

  const { setSecondColumn } = usePageLayout();
  useEffect(() => {
    setSecondColumn(
      <div className="flex flex-col p-8 bg-anrep-pink-50 grow gap-4  w-full mt-40">
        <H2>Save query</H2>
        <CustomQueryMetadataEditor
          form={metadataForm}
          errors={metadataErrors}
          onError={setMetadataErrors}
          onChange={handleChangeMetadata}
        />
        <div className="flex justify-between items-center ">
          <div>
            <NeutralButton
              onClick={props.handleSubmitSave}
              disabled={hasMetadataError}
            >
              Save
            </NeutralButton>
          </div>
          <div>
            <NeutralButton
              onClick={props.handleCancel}
              className="ml-3 pl-5"
              disabled={hasMetadataError}
            >
              Cancel
            </NeutralButton>
          </div>
        </div>
      </div>,
    );
    return () => setSecondColumn(null);
  }, [metadataForm, metadataErrors]);

  return (
    <>
      <CustomQueryTemplateEditor onParameterChange={handleParameterChange} />
    </>
  );
}
