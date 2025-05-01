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

export enum QueryOperatorOrFn {
  none = 'none',
  equal = ':=',
  notEqual = ':!=',
  lessThan = ':<',
  lessThanOrEqual = ':<=',
  greaterThan = ':>',
  greaterThanOrEqual = ':>=',
  isIn = ':isIn',
  isNotIn = ':isNotIn',
  isWithinTextAnchorRange = ':isWithinTextAnchorRange',
  overlapsWithTextAnchorRange = ':overlapsWithTextAnchorRange',
}

export const queryOperatorOrFnValues: string[] = Object.values(QueryOperatorOrFn)

export function toOperator(value: string): QueryOperatorOrFn | null {
  if (!queryOperatorOrFnValues.includes(value)) {
    return null
  }
  return value as QueryOperatorOrFn;
}

export type ContainerQuery =
  | SimpleQuery

export type SimpleQuery = Record<string, string>