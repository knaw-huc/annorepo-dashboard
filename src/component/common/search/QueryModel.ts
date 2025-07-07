import {
  FieldQuery
} from "../../../client/ArModel.ts";
import {toQueryFieldForms} from "../../../store/query/util/toQueryFieldForm.ts";
import {toParamName} from "../../../store/query/util/toParamName.ts";
import {toSearchQuery} from "../../../store/query/util/toSearchQuery.ts";
import {QueryValue} from "../../../model/query/value/QueryValue.ts";
import {QueryOperator} from "../../../model/query/operator/QueryOperator.ts";

export type ErroneousValue = string

export type FieldQueryForm = {
  field: string,
  operator: QueryOperator
  value: QueryValue | ErroneousValue
}

export type ErrorRecord<T extends object> = Record<keyof T, string>

export const defaultQuery: FieldQuery = {field: {[QueryOperator.equal]: "value"}}
export const defaultParams: string[] = toQueryFieldForms(defaultQuery)
  .map((f,i) => toParamName(f, i))
export const defaultTemplate: FieldQuery = toSearchQuery(toQueryFieldForms(defaultQuery)
  .map((f,i) => ({...f, value: toParamName(f, i)})), defaultParams)

export type QueryEntry = [string, any]

// False when form at index does not contain parameter
export type FormParamValue = string | false;
export type FieldQueryErrors = ErrorRecord<FieldQueryForm>;