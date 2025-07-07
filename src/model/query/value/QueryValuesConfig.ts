import {QueryValue} from "./QueryValue.ts";
import {QueryValueType} from "./QueryValueType.ts";

export type QueryValuesConfig<T extends QueryValue> = {
  type: QueryValueType
  toValue: (str: string) => T
  toString: (val: T) => string
  isType: (val: QueryValue) => val is T
  defaultValue: T
}