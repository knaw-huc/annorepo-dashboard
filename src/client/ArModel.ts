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
  '@context': string[],
  id: string,
  via?: string,
  label: string
  type: string[]
  total: number
  first: ArAnnotationPage
  last: string,
  readOnlyForAnonymousUsers: boolean
}

// TODO: replace with SearchQuery?
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

export const nonFnQueryOperators = [
  QueryOperator.equal,
  QueryOperator.notEqual,
  QueryOperator.lessThan,
  QueryOperator.lessThanOrEqual,
  QueryOperator.greaterThan,
  QueryOperator.greaterThanOrEqual,
  QueryOperator.isIn,
  QueryOperator.isNotIn
] as const

export type NonFnQueryOperator = typeof nonFnQueryOperators[number]

export const rangeQueryOperator = [
  QueryOperator.overlapsWithTextAnchorRange,
  QueryOperator.isWithinTextAnchorRange
] as const

export type RangeQueryOperator = typeof rangeQueryOperator[number]

export function isRangeQueryOperator(toTest: string): toTest is RangeQueryOperator {
  return rangeQueryOperator.includes(toTest as RangeQueryOperator);
}

export function isNonFnOperator(toTest: string): toTest is NonFnQueryOperator {
  return nonFnQueryOperators.includes(toTest as NonFnQueryOperator);
}

export const queryOperatorOrFnValues: string[] = Object.values(QueryOperator)

export function toOperator(value: string): QueryOperator | null {
  if (!queryOperatorOrFnValues.includes(value)) {
    return null
  }
  return value as QueryOperator;
}

export type SearchQuery = Record<string, any>;

export type SearchSubquery =
  | SimpleQuery
  | FieldQuery
  | RangeQuery

export type SimpleQuery = Record<string, string>

export type FieldQuery = Record<Field, Partial<Record<
  QueryOperator,
  QueryValue
>>>
type Field = string;

export type RangeQuery = Partial<Record<
  RangeQueryOperator,
  RangeQueryValue
>>
export const NO_FIELD = 'n.a.'

export type RangeQueryValue = { source: string, start: number, end: number };

export function isRangeQueryValue(
  toTest: QueryValue
): toTest is RangeQueryValue {
  return !!(toTest
    && (toTest as RangeQueryValue).source
    && (toTest as RangeQueryValue).start !== undefined
    && (toTest as RangeQueryValue).end !== undefined)
}

export type QueryValue = string | number | string[] | RangeQueryValue
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

export type ArCustomQueryForm = {
  name: string,
  description: string,
  label: string,
  public: boolean

  /**
   * {@link SearchQuery}
   */
  query: string,
}

export type CustomQueryForm = Omit<ArCustomQueryForm, 'query'>

export type ArCustomQueryResult = Omit<ArCustomQueryForm, "query"> & {
  created: string,
  createdBy: string,
  queryTemplate: string,
  parameters: string[]
}

