import { RangeQueryOperator } from "./query/operator/RangeQueryOperator.ts";
import { Operator } from "./query/operator/Operator.ts";
import { QueryValue } from "./query/value/QueryValue.ts";
import { Any } from "../store/query/util/Any.ts";

export type ArAboutData = {
  appName: string;
  version: string;
  startedAt: string;
  baseURI: string;
  withAuthentication: boolean;
  sourceCode: string;
  mongoVersion: string;
};

export type ArMyContainers = Record<string, string[]>;

export type ArAnnotationPage = {
  id: string;
  type: "AnnotationPage";
  partOf: string;
  startIndex: number;
  items: ArAnnotation[];
  next?: string;
  prev?: string;
};

export type ArContainer = {
  "@context": string[];
  id: string;
  via?: string;
  label: string;
  type: string[];
  total: number;
  first: ArAnnotationPage;
  last: string;
  readOnlyForAnonymousUsers: boolean;
};

export type ArQuery = object;

export type ArAnnotation<T extends object = object> = {
  "@context": "http://www.w3.org/ns/anno.jsonld";

  id: string;
  via?: string;

  type: string;
  body: T;
  target: string | object;
};

export type ArContainerFields = Record<string, number>;

export type SearchQueryJson = Record<string, Any>;

export type ArCustomQueryForm = {
  name: string;
  description: string;
  label: string;
  public: boolean;

  /**
   * {@link SearchQueryJson}
   */
  query: string;
};

export type ArCustomQueryResult = Omit<ArCustomQueryForm, "query"> & {
  created: string;
  createdBy: string;
  queryTemplate: string;
  parameters: string[];
};

export type ArField = string;
export type ArSimpleFieldQuery = Record<string, string>;
export type ArExtendedFieldQuery = Record<
  ArField,
  Partial<Record<Operator, QueryValue>>
>;
export type ArRangeQuery = Partial<
  Record<RangeQueryOperator, ArRangeQueryValue>
>;
export const NO_FIELD = "n.a.";
export type ArRangeQueryValue = { source: string; start: number; end: number };

export function isArRangeQueryValue(
  toTest: QueryValue,
): toTest is ArRangeQueryValue {
  return !!(
    toTest &&
    (toTest as ArRangeQueryValue).source &&
    (toTest as ArRangeQueryValue).start !== undefined &&
    (toTest as ArRangeQueryValue).end !== undefined
  );
}

export type ArSearchSubQuery =
  | ArSimpleFieldQuery
  | ArExtendedFieldQuery
  | ArRangeQuery;

export type ArQueryEntry = [string, Any];
