import {
  ArCustomQueryForm,
  CustomQueryForm,
  SearchQuery
} from "../../client/ArModel.ts";
import {H2} from "../common/H2.tsx";
import {toQueryFieldForms} from "../common/search/util/toQueryFieldForms.ts";
import {toSearchQuery} from "../common/search/util/toSearchQuery.tsx";
import {FieldQueryForm, hasError} from "../common/search/QueryModel.ts";
import {CustomSubQueryEditor} from "../common/search/CustomSubQueryEditor.tsx";
import {CustomQueryMetadataEditor} from "./CustomQueryMetadataEditor.tsx";
import {useEffect, useState} from "react";
import {isEmpty, isEqual, noop} from "lodash";
import {toErrorRecord} from "../common/form/util/toErrorRecord.ts";
import {ErrorRecord} from "../common/form/util/ErrorRecord.ts";
import {CheckboxWithLabel} from "../common/form/CheckboxWithLabel.tsx";
import {Info} from "../common/icon/Info.tsx";

/**
 * Allow creating a new custom query
 */
export function CustomQueryEditor(props: {
  metadata: Omit<ArCustomQueryForm, 'query'>
  onChangeMetadata: (query: Omit<ArCustomQueryForm, 'query'>) => void
  onMetadataError: () => void
  onClearMetadataError: () => void

  /**
   * Current query
   */
  query: SearchQuery

  /**
   * Query with global query values for values
   */
  globalQuery: SearchQuery

  /**
   * Query with parameters for values
   */
  parameterQuery: SearchQuery

  /**
   * Only values can change
   */
  onChangeQuery: (update: SearchQuery) => void
}) {

  const {
    metadata,
    onMetadataError,
    onClearMetadataError,

    query,
    globalQuery,
    parameterQuery,
    onChangeQuery,
  } = props;

  const [metadataForm, setMetadataForm] = useState<CustomQueryForm>(metadata);
  const [metadataErrors, setMetadataErrors] = useState(toErrorRecord(metadata));
  const [subqueryForms, setSubqueryForms] = useState<FieldQueryForm[]>([])

  /**
   * Is sub query value a parameter? By form index
   */
  const [isParameters, setIsParameters] = useState<boolean[]>([])

  /**
   * Update forms and errors when template changes
   */
  useEffect(() => {
    const isQueryEqual = isEqual(query, toSearchQuery(subqueryForms));
    if (isQueryEqual) {
      return;
    }
    console.log('query not equal to forms!', {query, subqueryForms})
    const forms = toQueryFieldForms(query);
    setSubqueryForms(forms)
    // Set all values by default to parameters:
    setIsParameters(forms.map(() => true))
  }, [query]);

  function updateParameters(formIndex: number, update: boolean) {
    const nextParameters = isParameters.map((prev, i) => i === formIndex
      ? update
      : prev
    )
    setIsParameters(nextParameters)
    const nextForms = subqueryForms.map((form, i) => {
      const nextValue = update
        ? toQueryFieldForms(parameterQuery)[i].value
        : toQueryFieldForms(globalQuery)[i].value;
      return i === formIndex
        ? {...form, value: nextValue}
        : form;
    })
    setSubqueryForms(nextForms)
    onChangeQuery(toSearchQuery(nextForms))
  }

  useEffect(() => {
    if (hasError(metadataErrors)) {
      onMetadataError()
    } else {
      onClearMetadataError()
    }
  }, [metadataErrors]);

  const handleChangeMetadata = (update: CustomQueryForm) => {
    setMetadataForm(update)
    const hasErrors = Object.values(metadataErrors).some(field => !isEmpty(field));
    if (!hasErrors) {
      props.onChangeMetadata(update)
    }
  }

  return <>
    <H2>Metadata</H2>
    <CustomQueryMetadataEditor
      form={metadataForm}
      errors={metadataErrors}
      onError={setMetadataErrors}
      onChange={handleChangeMetadata}
    />
    <H2>Custom Query</H2>
    {subqueryForms.map((form, i) => <div key={i} className="flex items-center">
      <CustomSubQueryEditor
        key={i}
        form={form}
        errors={{} as ErrorRecord<FieldQueryForm>}
        disabled={true}
        onChange={noop}
        onError={noop}
      />
      <div className="ml-4">
        <CheckboxWithLabel
          label={
            <span
              title="Search with a variable parameter, or use a fixed value?"
            >
              Parameter <Info/>
            </span>
          }
          value={isParameters[i]}
          onChange={(update) => updateParameters(i, update)}
        /></div>
    </div>)}
  </>
}

