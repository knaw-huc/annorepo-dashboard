import {
  FieldQuery,
  QueryOperator,
  QueryValue
} from "../../../client/ArModel.ts";
import {isString, mapValues, some} from "lodash";
import {hasError} from "../../../store/query/util/hasError.ts";

export type FieldQueryForm = {
  field: string,
  operator: QueryOperator
  value: QueryValue
}

export type ErrorRecord<T extends object> = Record<keyof T, string>

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

export function hasErrorByField(forms: FieldQueryFormErrorsByField[]) {
  return some(forms, errorsByField => hasError(errorsByField.errors));
}

export type ValueParam = string | false;