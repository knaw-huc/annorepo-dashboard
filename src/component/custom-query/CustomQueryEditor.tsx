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

  const [metadataForm, setMetadataForm] = useState<CustomQueryForm>(metadata);
  const [metadataErrors, setMetadataErrors] = useState(toErrorRecord(metadata));

  const [subqueryForms, setSubqueryForms] = useState<FieldQueryForm[]>([])

  /**
   * Update forms and errors when template changes
   */
  useEffect(() => {
    const isQueryEqual = isEqual(query, toSearchQuery(subqueryForms));
    if (isQueryEqual) {
      return;
    }
    const forms = toQueryFieldForms(query);
    setSubqueryForms(forms)
  }, [template]);

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
    {subqueryForms.map((form, i) => <CustomSubQueryEditor
      key={i}
      form={form}
      errors={{} as ErrorRecord<FieldQueryForm>}

      // TODO: allow fixed values
      disabled={true}
      onChange={noop}
      onError={noop}
    />)}
  </>
}

