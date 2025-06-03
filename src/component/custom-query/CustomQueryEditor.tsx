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
  FieldQueryForm,
  FieldQueryFormErrorsByField,
  hasError
} from "../common/search/QueryModel.ts";
import {SubQueryParamEditor} from "../common/search/SubQueryParamEditor.tsx";
import {CustomQueryMetadataEditor} from "./CustomQueryMetadataEditor.tsx";
import {useEffect, useState} from "react";
import {isEmpty, isEqual, omit} from "lodash";
import {toErrorRecord} from "../common/form/util/toErrorRecord.ts";
import {Back} from "../common/icon/Back.tsx";

export function CustomQueryEditor(props: {
  customQuery: Omit<ArCustomQueryForm, 'query'>
  queryTemplate: SearchQuery

  onChangeCustomQuery: (query: Omit<ArCustomQueryForm, 'query'>) => void
  onChangeQueryTemplate: (query: SearchQuery) => void

  onClose: () => void

  isExistingQuery: boolean
  // When isExistingQuery==true:
  onSearch: () => void
  // When isExistingQuery==false:
  onSave: () => void
  onEditQueryTemplate: () => void

}) {

  const {queryTemplate, customQuery, onSearch, isExistingQuery, onSave} = props;

  const [metadata, setMetadata] = useState<CustomQueryForm>(isExistingQuery ? customQuery : omit(defaultCustomQueryForm, 'query'));
  const [metadataErrors, setMetadataErrors] = useState(toErrorRecord(isExistingQuery ? customQuery : omit(defaultCustomQueryForm, 'query')));

  const [subqueryForms, setSubqueryForms] = useState<FieldQueryForm[]>([])
  const [subqueryErrors, setSubqueryErrors] = useState<FieldQueryFormErrorsByField[]>([])

  /**
   * Update forms and errors when template changes
   */
  useEffect(() => {
    const isQueryTemplateEqual = isEqual(props.queryTemplate, toSearchQuery(subqueryForms));
    if (isQueryTemplateEqual) {
      return;
    }
    const forms = toTemplates(toQueryFieldForms(props.queryTemplate));
    setSubqueryForms(forms)
    setSubqueryErrors(forms.map(f => createFieldQueryFormErrors(f)))
  }, [queryTemplate, isExistingQuery]);

  const handleChangeSubquery = (valueUpdate: QueryValue, index: number) => {
    const formUpdate = subqueryForms.map((form, i) =>
      i === index ? {...form, value: valueUpdate} : form
    )
    setSubqueryForms(formUpdate)
    if (!hasError(subqueryErrors)) {
      props.onChangeQueryTemplate(toSearchQuery(formUpdate))
    }
  }

  const handleChangeMetadata = (update: CustomQueryForm) => {
    setMetadata(update)
    const hasErrors = Object.values(metadataErrors).some(field => !isEmpty(field));
    if(!hasErrors) {
      props.onChangeCustomQuery(update)
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

  const handleSubmitSearch = () => {
    if (hasError(subqueryErrors)) {
      return;
    }
    onSearch()
  }

  return <>
    <H2>Metadata</H2>
    <CustomQueryMetadataEditor
      form={metadata}
      errors={metadataErrors}
      onError={setMetadataErrors}
      onChange={handleChangeMetadata}
      disabled={isExistingQuery}
    />
    <H2>Custom Query</H2>
    {subqueryForms.map((qt, i) => <SubQueryParamEditor
      key={i}
      form={qt}
      errors={subqueryErrors[i].errors}
      onChange={(es) => handleChangeSubquery(es, i)}
      onError={(error) => handleSubqueryError(error, i)}
      isExistingQuery={props.isExistingQuery}
    />)}
    {props.isExistingQuery && <Button
      onClick={handleSubmitSearch}
      className="ml-3 pl-5"
    >
      Search<Next className="ml-2"/>
    </Button>}
    {!props.isExistingQuery && <Button
      onClick={props.onEditQueryTemplate}
      secondary
      className="pr-5"
    >
      <Back className="mr-2"/>Edit query
    </Button>}
    {!props.isExistingQuery && <Button
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
  result.value = `<${key}>`
  return result
}

