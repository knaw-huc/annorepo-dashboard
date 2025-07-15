import {QueryValue} from "./QueryValue.ts";
import {QueryValueType} from "./QueryValueType.ts";

export type QueryValueMapper<T extends QueryValue> = {
  type: QueryValueType

  // Parsed value:
  toValue: (str: string) => T

  // As shown in input form field:
  toInputValue: (val: T) => string

  // As used in a custom query parameter string that is to be base64 encoded:
  toParameterValue: (val: T) => string

  isType: (val: QueryValue) => val is T
  defaultValue: T
}