import {RangeQueryValue} from "../../../client/ArModel.ts";

export const emptyValue = null
export type EmptyValue = typeof emptyValue

export type QueryValue =
  | string
  | number
  | string[]
  | RangeQueryValue
  | EmptyValue // Absent value

/**
 * Remove null values
 */
export function emptyValueReplacer(_: any, value: any) {
  return value === emptyValue ? undefined : value;
}

export function removeEmptyValues(form: object) {
  return JSON.parse(JSON.stringify(form, emptyValueReplacer))
}