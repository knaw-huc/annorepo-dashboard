import {
  ArCustomQueryForm,
  CustomQueryForm,
  QueryValue,
  SearchQuery
} from "../../client/ArModel.ts";
import {H2} from "../common/H2.tsx";
import {toQueryFieldForms} from "../common/search/util/toQueryFieldForms.ts";
import {toSearchQuery} from "../common/search/util/toSearchQuery.tsx";
import {
  createFieldQueryFormErrors,
  createFieldQueryFormHasParameter,
  FieldQueryForm,
  FieldQueryFormErrorsByField,
  FieldQueryFormIsParameter,
  hasErrorByField
} from "../common/search/QueryModel.ts";
import {CustomSubQueryEditor} from "../common/search/CustomSubQueryEditor.tsx";
import {CustomQueryMetadataEditor} from "./CustomQueryMetadataEditor.tsx";
import {useEffect, useState} from "react";
import {isEqual} from "lodash";
import {ErrorRecord} from "../common/form/util/ErrorRecord.ts";
import noop from "lodash/noop";

export function CustomQueryCallEditor(props: {
  metadata: Omit<ArCustomQueryForm, 'query'>
  template: SearchQuery
  query: SearchQuery
  parameters: string[]
  onChangeQuery: (query: SearchQuery) => void
  onError: () => void
  onClearError: () => void
}) {

  const {
    metadata,
    template,
    query,
    parameters
  } = props;

  const [subqueryForms, setSubqueryForms] = useState<FieldQueryForm[]>([])
  const [subqueryParameters, setSubqueryParameters] = useState<FieldQueryFormIsParameter[]>([])
  const [subqueryErrors, setSubqueryErrors] = useState<FieldQueryFormErrorsByField[]>([])

  /**
   * Update forms and errors when query parameters change
   */
  useEffect(() => {
    const isQueryEqual = isEqual(query, toSearchQuery(subqueryForms));
    if (isQueryEqual) {
      return;
    }
    const forms = toQueryFieldForms(query)
    setSubqueryForms(forms)
    setSubqueryErrors(forms.map(f => createFieldQueryFormErrors(f)))

    // Use template to determine if form contains a parameter or a fixed value:
    const templateForm = toQueryFieldForms(template);
    setSubqueryParameters(templateForm.map(tf => createFieldQueryFormHasParameter(tf, parameters)))
  }, [query]);

  useEffect(() => {
    if (hasErrorByField(subqueryErrors)) {
      props.onError?.()
    } else {
      props.onClearError?.()
    }
  }, [subqueryErrors]);

  const handleChangeSubquery = (valueUpdate: QueryValue, index: number) => {
    const formUpdate = subqueryForms.map((form, i) =>
      i === index ? {...form, value: valueUpdate} : form
    )
    setSubqueryForms(formUpdate)
    if (!hasErrorByField(subqueryErrors)) {
      props.onChangeQuery(toSearchQuery(formUpdate))
    }
  }

  const handleSubqueryError = (error: string, index: number) => {
    setSubqueryErrors(prev => prev.map((errorForm, i) =>
      i === index ? {
        ...errorForm,
        errors: {...errorForm.errors, value: error}
      } : errorForm
    ))
  }

  return <>
    <H2>Metadata</H2>
    <CustomQueryMetadataEditor
      form={metadata}
      errors={{} as ErrorRecord<CustomQueryForm>}
      onError={noop}
      onChange={noop}
      disabled={true}
    />
    <H2>Custom Query</H2>
    <p>Modify parameters and click search:</p>
    {subqueryForms.map((form, i) => <CustomSubQueryEditor
      key={i}
      form={form}
      errors={subqueryErrors[i].errors}
      onChange={(es) => handleChangeSubquery(es, i)}
      onError={(error) => handleSubqueryError(error, i)}
      disabled={!subqueryParameters[i].isParameter}
    />)}
  </>
}

export const defaultCustomQueryForm: CustomQueryForm = {
  name: "name-of-custom-query",
  description: "Description of custom query",
  label: "Label of custom query",
  public: true,
}
