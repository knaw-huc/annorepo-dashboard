import { ArCustomQueryForm } from "../../model/ArModel.ts";
import { H2 } from "../common/H2.tsx";
import { CustomQueryMetadataEditor } from "./CustomQueryMetadataEditor.tsx";
import { useEffect, useState } from "react";
import { isEmpty, PropertyName } from "lodash";
import { toErrorRecord } from "../../store/query/util/error/toErrorRecord.ts";
import { hasError } from "../../store/query/util/error/hasError.ts";
import { useStore } from "../../store/useStore.ts";
import { toParamName } from "../../store/query/util/toParamName.ts";
import { CustomQueryMetadataForm } from "./model/CustomQueryMetadataForm.ts";
import { getOrThrow } from "../../store/query/util/getOrThrow.ts";

import { CustomQueryTemplateEditor } from "./CustomQueryTemplateEditor.tsx";

/**
 * Allow creating a new custom query
 */
export function NewCustomQueryMetadataAndTemplateEditor(props: {
  metadata: Omit<ArCustomQueryForm, "query">;
  onChangeMetadata: (query: Omit<ArCustomQueryForm, "query">) => void;
  onMetadataError: () => void;
  onClearMetadataError: () => void;
}) {
  const { metadata, onMetadataError, onClearMetadataError } = props;

  const { subqueries, updateComparisonSubquery } = useStore();

  const [metadataForm, setMetadataForm] =
    useState<CustomQueryMetadataForm>(metadata);
  const [metadataErrors, setMetadataErrors] = useState(toErrorRecord(metadata));

  function handleParameterChange(path: PropertyName[], isParam: boolean) {
    const form = getOrThrow(subqueries, path).form;
    const update = isParam ? toParamName(form, path) : false;
    updateComparisonSubquery({ path, param: update });
  }

  useEffect(() => {
    if (hasError(metadataErrors)) {
      onMetadataError();
    } else {
      onClearMetadataError();
    }
  }, [metadataErrors]);

  const handleChangeMetadata = (update: CustomQueryMetadataForm) => {
    setMetadataForm(update);
    const hasErrors = Object.values(metadataErrors).some(
      (field) => !isEmpty(field),
    );
    if (!hasErrors) {
      props.onChangeMetadata(update);
    }
  };

  return (
    <>
      <H2>Metadata</H2>
      <CustomQueryMetadataEditor
        form={metadataForm}
        errors={metadataErrors}
        onError={setMetadataErrors}
        onChange={handleChangeMetadata}
      />
      <H2>Custom Query</H2>
      <CustomQueryTemplateEditor onParameterChange={handleParameterChange} />
    </>
  );
}
