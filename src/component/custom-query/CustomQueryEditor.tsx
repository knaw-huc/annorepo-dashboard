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
  template: SearchQuery
  query: SearchQuery

  onChangeMetadata: (query: Omit<ArCustomQueryForm, 'query'>) => void

  onError: () => void
  onClearError: () => void
}) {

  const {
    template,
    query,
    metadata,
    onError,
    onClearError
  } = props;

  console.log('CustomQueryEditor', {template, query})

  const [metadataForm, setMetadataForm] = useState<CustomQueryForm>(metadata);
  const [metadataErrors, setMetadataErrors] = useState(toErrorRecord(metadata));
  const [subqueryForms, setSubqueryForms] = useState<FieldQueryForm[]>([])

  /**
   * Is sub query value a parameter? By form index
   */
  const [parameters, setParameters] = useState<boolean[]>([])

  /**
   * Update forms and errors when template changes
   */
  useEffect(() => {
    const isQueryEqual = isEqual(query, toSearchQuery(subqueryForms));
    if (isQueryEqual) {
      return;
    }
    const forms = toQueryFieldForms(template);
    setSubqueryForms(forms)
    setParameters(forms.map(() => true))
  }, [template]);

  function updateParameters(formIndex: number, update: boolean) {
    const nextParameters = parameters.map((prev, i) => i === formIndex
      ? update
      : prev
    )
    setParameters(nextParameters)
    const nextForms = subqueryForms.map((form, i) => {
      const nextValue = update
        ? toQueryFieldForms(template)[i].value
        : toQueryFieldForms(query)[i].value;
      return i === formIndex
        ? {...form, value: nextValue}
        : form;
    })
    setSubqueryForms(nextForms)
  }

  useEffect(() => {
    if (hasError(metadataErrors)) {
      onError()
    } else {
      onClearError()
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

        // TODO: allow fixed values
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
          value={parameters[i]}
          onChange={(update) => updateParameters(i, update)}
        /></div>
    </div>)}
  </>
}

