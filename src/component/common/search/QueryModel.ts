import {
  FieldQuery,
  QueryOperator,
  QueryValue
} from "../../../client/ArModel.ts";

export type ErroneousValue = string

export type FieldQueryForm = {
  field: string,
  operator: QueryOperator
  value: QueryValue | ErroneousValue
}

export type ErrorRecord<T extends object> = Record<keyof T, string>

export const defaultQuery: FieldQuery = {field: {[QueryOperator.equal]: "value"}}

export type QueryEntry = [string, any]

// False when form at index does not contain parameter
export type FormParamValue = string | false;
export type FieldQueryErrors = ErrorRecord<FieldQueryForm>;