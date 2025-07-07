import {QueryValue} from "../model/query/value/QueryValue.ts";
import {QueryOperator} from "../model/query/operator/QueryOperator.ts";
import {
  RangeQueryOperator
} from "../model/query/operator/RangeQueryOperator.ts";

export type ArAboutData = {
  appName: string,
  version: string,
  startedAt: string,
  baseURI: string,
  withAuthentication: boolean,
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
  target: string | object,
}

export type ArContainerFields = Record<string, number>


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

export type ArCustomQueryResult = Omit<ArCustomQueryForm, "query"> & {
  created: string,
  createdBy: string,
  queryTemplate: string,
  parameters: string[]
}

