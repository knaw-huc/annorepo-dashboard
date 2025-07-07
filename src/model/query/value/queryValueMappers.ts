import {QueryValuesConfig} from "./QueryValuesConfig.ts";
import {QueryValue} from "./QueryValue.ts";
import {isNumber, isString, toNumber, toString} from "lodash";
import {isRangeQueryValue} from "../../../client/ArModel.ts";

export const queryValueMappers: QueryValuesConfig<QueryValue>[] = [
  {
    type: 'string',
    toValue: toString,
    toString: toString,
    isType: isString,
    defaultValue: 'value'
  },
  {
    type: 'number',
    toValue: toNumber,
    toString: toString,
    isType: isNumber,
    defaultValue: 1
  },
  {
    type: 'options',
    toValue: JSON.parse,
    toString: JSON.stringify,
    isType: Array.isArray,
    defaultValue: ['value1', 'value2']
  },
  {
    type: 'range',
    toValue: JSON.parse,
    toString: JSON.stringify,
    isType: isRangeQueryValue,
    defaultValue: {source: 'http://example.com', start: 0, end: 1}
  }
]