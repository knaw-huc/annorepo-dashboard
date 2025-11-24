import { ArRangeQueryValue } from "../../ArModel.ts";

export const absentValue = null;
export type AbsentValue = typeof absentValue;

export type QueryValue =
  | string
  | number
  | string[]
  | ArRangeQueryValue
  /**
   * Is a form field empty or absent?
   */
  | AbsentValue;

/**
 * Remove absent values from json
 */
export function absentValueReplacer(_: unknown, value: unknown) {
  return value === absentValue ? undefined : value;
}

export function removeAbsentValues(form: object): object {
  return JSON.parse(JSON.stringify(form, absentValueReplacer));
}
