import {QueryValueMapper} from "./QueryValueMapper.ts";
import {emptyValue, QueryValue} from "./QueryValue.ts";
import {isNumber, isString, toNumber, toString} from "lodash";


import {isArRangeQueryValue} from "../../ArModel.ts";

export const queryValueMappers: QueryValueMapper<QueryValue>[] = [
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
    isType: isArRangeQueryValue,
    defaultValue: {source: 'http://example.com', start: 0, end: 1}
  }
]

function toNumberOrThrow(value: string) {
  if (value === "") {
    return emptyValue;
  }
  const decimalSeparator = ".";
  if(value.endsWith(decimalSeparator)) {
    throw new Error(`Number ${value} cannot end with ${decimalSeparator}`)
  }
  const asNumber = toNumber(value);
  if (isNaN(asNumber)) {
    throw new Error(`Could not convert ${value} to number`)
  }
  return asNumber
}