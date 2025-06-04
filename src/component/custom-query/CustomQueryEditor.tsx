import {
  ArCustomQueryForm,
  CustomQueryForm,
  QueryValue,
  SearchQuery
} from "../../client/ArModel.ts";
import {H2} from "../common/H2.tsx";
import {Button} from "../common/Button.tsx";
import {Next} from "../common/icon/Next.tsx";
import {toQueryFieldForms} from "../common/search/util/toQueryFieldForms.ts";
import {toSearchQuery} from "../common/search/util/toSearchQuery.tsx";
import {
  createFieldQueryFormErrors,
  createFieldQueryFormHasParameter,
  FieldQueryForm,
  FieldQueryFormErrorsByField,
  FieldQueryFormIsParameter,
  hasError
} from "../common/search/QueryModel.ts";
import {CustomSubQueryEditor} from "../common/search/CustomSubQueryEditor.tsx";
import {CustomQueryMetadataEditor} from "./CustomQueryMetadataEditor.tsx";
import {useEffect, useState} from "react";
import {isEmpty, isEqual} from "lodash";
import {toErrorRecord} from "../common/form/util/toErrorRecord.ts";
import {Back} from "../common/icon/Back.tsx";

/**
 * TODO: Create separate components for new and existing queries?
 */
export function CustomQueryEditor(props: {
  metadata: Omit<ArCustomQueryForm, 'query'>
  template: SearchQuery
  query: SearchQuery

  onChangeMetadata: (query: Omit<ArCustomQueryForm, 'query'>) => void
  onChangeQuery: (query: SearchQuery) => void

  onClose: () => void

  onError?: () => void
  onClearError?: () => void

  isExistingQuery: boolean
  // When isExistingQuery==true:
  parameters?: string[]
  // When isExistingQuery==false:
  onSave: () => void
  onEditQueryTemplate: () => void
}) {

  const {
    template,
    query,
    metadata,
    isExistingQuery,
    onSave,
    parameters
  } = props;

  const [metadataForm, setMetadataForm] = useState<CustomQueryForm>(metadata);
  const [metadataErrors, setMetadataErrors] = useState(toErrorRecord(metadata));

  const [subqueryForms, setSubqueryForms] = useState<FieldQueryForm[]>([])
  const [subqueryParameters, setSubqueryParameters] = useState<FieldQueryFormIsParameter[]>([])
  const [subqueryErrors, setSubqueryErrors] = useState<FieldQueryFormErrorsByField[]>([])

  /**
   * Update forms and errors when template changes
   */
  useEffect(() => {
    const isQueryEqual = isEqual(query, toSearchQuery(subqueryForms));
    if (isQueryEqual) {
      return;
    }
    if (isExistingQuery) {
      const forms = toQueryFieldForms(query)
      setSubqueryForms(forms)
      setSubqueryErrors(forms.map(f => createFieldQueryFormErrors(f)))

      // Use template to determine if form contains a parameter or a fixed value:
      if (!parameters) {
        throw new Error('Existing query should have parameters')
      }
      const templateForm = toQueryFieldForms(template);
      setSubqueryParameters(templateForm.map(tf => createFieldQueryFormHasParameter(tf, parameters)))
    } else {
      const forms = toTemplates(toQueryFieldForms(query));
      setSubqueryForms(forms)
      setSubqueryErrors(forms.map(f => createFieldQueryFormErrors(f)))
      setSubqueryParameters(forms.map(tf => createFieldQueryFormHasParameter(tf, [])))
    }
  }, [template, isExistingQuery,]);

  const handleChangeSubquery = (valueUpdate: QueryValue, index: number) => {
    const formUpdate = subqueryForms.map((form, i) =>
      i === index ? {...form, value: valueUpdate} : form
    )
    setSubqueryForms(formUpdate)
    if (!hasError(subqueryErrors)) {
      props.onChangeQuery(toSearchQuery(formUpdate))
    }
  }

  const handleChangeMetadata = (update: CustomQueryForm) => {
    setMetadataForm(update)
    const hasErrors = Object.values(metadataErrors).some(field => !isEmpty(field));
    if (!hasErrors) {
      props.onChangeMetadata(update)
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
      form={metadataForm}
      errors={metadataErrors}
      onError={setMetadataErrors}
      onChange={handleChangeMetadata}
      disabled={isExistingQuery}
    />
    <H2>Custom Query</H2>
    {isExistingQuery && 'Modify parameters and click search:'}
    {subqueryForms.map((form, i) => <CustomSubQueryEditor
      key={i}
      form={form}
      errors={subqueryErrors[i].errors}
      onChange={(es) => handleChangeSubquery(es, i)}
      onError={(error) => handleSubqueryError(error, i)}
      isParameter={subqueryParameters[i].isParameter}
    />)}
    {!isExistingQuery && <Button
      onClick={props.onEditQueryTemplate}
      secondary
      className="pr-5"
    >
      <Back className="mr-2"/>Edit query
    </Button>}
    {!isExistingQuery && <Button
      onClick={onSave}
      className="ml-3 pl-5"
    >
      Save<Next className="ml-2"/>
    </Button>}
  </>
}

export const defaultCustomQueryForm: CustomQueryForm = {
  name: "name-of-custom-query",
  description: "Description of custom query",
  label: "Label of custom query",
  public: true,
}

export function toTemplates(query: FieldQueryForm[]): FieldQueryForm[] {
  return query.map(toTemplate)
}

export function toTemplate(query: FieldQueryForm): FieldQueryForm {
  const result = {...query};
  const key = result.field
  const keyWithoutDots = key.replaceAll('.', '-')
  result.value = `<${keyWithoutDots}>`
  return result
}

