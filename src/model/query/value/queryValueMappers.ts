import {QueryValuesConfig} from "./QueryValuesConfig.ts";
import {emptyValue, QueryValue} from "./QueryValue.ts";
import {isNumber, isString, toNumber, toString} from "lodash";
import {isRangeQueryValue} from "../../../client/ArModel.ts";

export const queryValueMappers: QueryValuesConfig<QueryValue>[] = [
  {
    type: 'string',
    toValue: str => str === "" ? emptyValue : str,
    toString: toString,
    isType: isString,
    defaultValue: 'value'
  },
  {
    type: 'number',
    toValue: str => str === "" ? emptyValue : toNumber(str),
    toString: toString,
    isType: isNumber,
    defaultValue: 1
  },
  {
    type: 'options',
    toValue: str => str === "" ? emptyValue : JSON.parse(str),
    toString: JSON.stringify,
    isType: Array.isArray,
    defaultValue: ['value1', 'value2']
  },
  {
    type: 'range',
    toValue: str => str === "" ? emptyValue : JSON.parse(str),
    toString: JSON.stringify,
    isType: isRangeQueryValue,
    defaultValue: {source: 'http://example.com', start: 0, end: 1}
  }
]