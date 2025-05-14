import {isNumber, isString, toNumber, toString} from "lodash";

export type ArAboutData = {
  appName: string,
  version: string,
  startedAt: string,
  baseURI: string,
  withAuthentication: string,
  sourceCode: string,
  mongoVersion: string
}

export type ArMyContainers = Record<string, string[]>

export type ArAnnotationPage = {
  id: string,
  type: "AnnotationPage",
  partOf: string,
  startIndex: number,
  items: ArAnnotation[]
  next?: string
  prev?: string
};

export type ArContainer = {
  id: string,
  via?: string,
  label: string
  type: string[]
  total: number
  first: ArAnnotationPage
  last: string
}

export type ArQuery = object

export type ArAnnotation<T extends object = object> = {
  "@context": "http://www.w3.org/ns/anno.jsonld",

  id: string
  via?: string

  type: string,
  body: T,
  target: string,
}

export type ArContainerFields = Record<string, number>

/**
 * See: https://github.com/knaw-huc/annorepo/blob/main/docs/api-usage.md#create-a-query--experimental
 */
export enum QueryOperator {
  // Query without operator:
  simpleQuery = 'simpleQuery',

  // Operators:
  equal = ':=',
  notEqual = ':!=',
  lessThan = ':<',
  lessThanOrEqual = ':<=',
  greaterThan = ':>',
  greaterThanOrEqual = ':>=',
  isIn = ':isIn',
  isNotIn = ':isNotIn',

  // Query functions:
  isWithinTextAnchorRange = ':isWithinTextAnchorRange',
  overlapsWithTextAnchorRange = ':overlapsWithTextAnchorRange',
}

export const queryOperatorOrFnValues: string[] = Object.values(QueryOperator)

export function toOperator(value: string): QueryOperator | null {
  if (!queryOperatorOrFnValues.includes(value)) {
    return null
  }
  return value as QueryOperator;
}

export type SearchQuery =
  | SimpleQuery
  | OperatorQuery

export type SimpleQuery = Record<string, string>
export type OperatorQuery = Record<string, Partial<Record<
  QueryOperator,
  QueryValue
>>>

export type QueryValueRange = { source: string, start: number, end: number };

export function isQueryValueRange(
  toTest: QueryValue
): toTest is QueryValueRange {
  return !!(toTest
    && (toTest as QueryValueRange).source
    && (toTest as QueryValueRange).start !== undefined
    && (toTest as QueryValueRange).end !== undefined)
}

export type QueryValue = string | number | string[] | QueryValueRange
export type QueryValueType = 'string' | 'number' | 'options' | 'range'

export const queryOperatorValueType: Record<QueryOperator, QueryValueType> = {
  [QueryOperator.simpleQuery]: 'string',
  [QueryOperator.equal]: 'string',
  [QueryOperator.notEqual]: 'string',
  [QueryOperator.lessThan]: 'number',
  [QueryOperator.lessThanOrEqual]: 'number',
  [QueryOperator.greaterThan]: 'number',
  [QueryOperator.greaterThanOrEqual]: 'number',
  [QueryOperator.isIn]: 'options',
  [QueryOperator.isNotIn]: 'options',
  [QueryOperator.isWithinTextAnchorRange]: 'range',
  [QueryOperator.overlapsWithTextAnchorRange]: 'range',
}

export type QueryValuesConfig<T extends QueryValue> = {
  type: QueryValueType
  toValue: (str: string) => T
  toString: (val: T) => string
  isType: (val: QueryValue) => val is T
  defaultValue: T
}

export const queryValueMapping: QueryValuesConfig<QueryValue>[] = [
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
    isType: isQueryValueRange,
    defaultValue: {source: 'http://example.com', start: 0, end: 1}
  }
]
