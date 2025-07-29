import { ArCustomQueryForm } from "../../model/ArModel.ts";
import { H2 } from "../common/H2.tsx";
import { CustomSubqueryEditor } from "../common/search/CustomSubqueryEditor.tsx";
import { CustomQueryMetadataEditor } from "./CustomQueryMetadataEditor.tsx";
import { useEffect, useState } from "react";
import { isEmpty, PropertyName } from "lodash";
import { toErrorRecord } from "../../store/query/util/toErrorRecord.ts";
import { CheckboxWithLabel } from "../common/form/CheckboxWithLabel.tsx";
import { Help } from "../common/icon/Help.tsx";
import { hasError } from "../../store/query/util/hasError.ts";
import { useStore } from "../../store/useStore.ts";
import { toParamTag } from "../../store/query/util/toParamTag.ts";
import { Tooltip } from "../common/Tooltip.tsx";
import { toParamName } from "../../store/query/util/toParamName.ts";
import { CustomQueryMetadataForm } from "./model/CustomQueryMetadataForm.ts";
import { getOrThrow } from "../../store/query/util/getOrThrow.ts";

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
    const update = isParam ? toParamTag(toParamName(form, path)) : false;
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
      {subqueries.map((_, i) => {
        const path = [i];
        const subquery = getOrThrow(subqueries, path);
        return (
          <div key={path.join()} className="flex items-center">
            <CustomSubqueryEditor path={path} isCall={false} />
            <div className="ml-4">
              <CheckboxWithLabel
                label={
                  <Tooltip text="Search with a variable parameter, or use a fixed value">
                    Parameter <Help />
                  </Tooltip>
                }
                value={subquery.param !== false}
                onChange={(update) => handleParameterChange(path, update)}
              />
            </div>
          </div>
        );
      })}
    </>
  );
}
