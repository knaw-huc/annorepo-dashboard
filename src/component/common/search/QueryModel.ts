import {
  FieldQuery,
  QueryOperator,
  QueryValue
} from "../../../client/ArModel.ts";
import {ErrorRecord} from "../form/util/ErrorRecord.ts";
import {isEmpty, isString, mapValues, some, values} from "lodash";

export type FieldQueryForm = {
  field: string,
  operator: QueryOperator
  value: QueryValue
}

export type FieldQueryFormErrorsByField = {
  field: string,
  errors: ErrorRecord<FieldQueryForm>
}

export type FieldQueryFormIsParameter = {
  field: string,
  isParameter: boolean
}

export const defaultQuery: FieldQuery = {field: {[QueryOperator.equal]: "value"}}

export type QueryEntry = [string, any]

export function createFieldQueryFormErrors(
  form: FieldQueryForm
): FieldQueryFormErrorsByField {
  return {
    field: form.field,
    errors: mapValues(form, _ => '')
  };
}

export function createFieldQueryFormHasParameter(
  templateForm: FieldQueryForm,
  parameters: string[]
): FieldQueryFormIsParameter {
  const value = templateForm.value;
  return {
    field: templateForm.field,
    isParameter: isString(value) && parameters.some(p => value.includes(p))
  };
}

export function hasError(forms: FieldQueryFormErrorsByField[]) {
  return some(forms, form =>
    values(form.errors).some(
      field => !isEmpty(field)
    )
  );
}
