import {QueryValuesConfig} from "./QueryValuesConfig.ts";
import {emptyValue, QueryValue} from "./QueryValue.ts";
import {isNumber, isString, toNumber, toString} from "lodash";
import {isRangeQueryValue} from "../../../client/ArModel.ts";

export const queryValueMappers: QueryValuesConfig<QueryValue>[] = [
  {
    type: 'string',
    toValue: str => str === "" ? emptyValue : str,
    toInputValue: toString,
    toParameterValue: JSON.stringify,
    isType: isString,
    defaultValue: 'value'
  },
  {
    type: 'number',
    toValue: toNumberOrThrow,
    toInputValue: toString,
    toParameterValue: toString,
    isType: isNumber,
    defaultValue: 1
  },
  {
    type: 'options',
    toValue: str => str === "" ? emptyValue : JSON.parse(str),
    toInputValue: JSON.stringify,
    toParameterValue: JSON.stringify,
    isType: Array.isArray,
    defaultValue: ['value1', 'value2']
  },
  {
    type: 'range',
    toValue: str => str === "" ? emptyValue : JSON.parse(str),
    toInputValue: JSON.stringify,
    toParameterValue: JSON.stringify,
    isType: isRangeQueryValue,
    defaultValue: {source: 'http://example.com', start: 0, end: 1}
  }
]

function toNumberOrThrow(value: string) {
  if (value === "") {
    return emptyValue;
  }
  const asNumber = toNumber(value);
  if (isNaN(asNumber)) {
    throw new Error(`Could not convert ${value} to number`)
  }
  return asNumber
}