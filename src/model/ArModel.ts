import { RangeQueryOperator } from "./query/operator/RangeQueryOperator.ts";
import {
  isLogicalOperator,
  LogicalOperator,
  Operator,
} from "./query/operator/Operator.ts";
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

/**
 * TODO: use {@link ArQueryEntry}
 */
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

export type ArQueryEntry = ArCompareEntry | ArLogicalEntry;

export type EntryToRecord<ENTRY extends [Any, Any]> = {
  [KEY in ENTRY[0]]: ENTRY[1];
};

export type ArField = string;

export type ArSimpleEntry = [ArField, string];
export type ArSimpleSubquery = EntryToRecord<ArSimpleEntry>;

export type ArExtendedValue = Partial<Record<Operator, QueryValue>>;
export type ArExtendedEntry = [ArField, ArExtendedValue];
export type ArExtendedSubquery = EntryToRecord<ArExtendedEntry>;

export type ArRangeEntry = [RangeQueryOperator, ArRangeQueryValue];

export type ArCompareEntry = ArRangeEntry | ArExtendedEntry | ArSimpleEntry;
export function isArCompareEntry(
  toTest: ArQueryEntry,
): toTest is ArCompareEntry {
  return !isArLogicalEntry(toTest);
}

export type ArCompareValue = ArCompareEntry[1];
export type ArCompareRecord = EntryToRecord<ArCompareEntry>;

export const NO_FIELD = "n.a.";
export type ArRangeQueryValue = { source: string; start: number; end: number };
export function isArRangeQueryValue(toTest: Any): toTest is ArRangeQueryValue {
  return !!(
    toTest &&
    (toTest as ArRangeQueryValue).source &&
    (toTest as ArRangeQueryValue).start !== undefined &&
    (toTest as ArRangeQueryValue).end !== undefined
  );
}

export type ArLogicalEntry = [LogicalOperator, ArCompareRecord];
export function isArLogicalEntry(
  toTest: ArQueryEntry,
): toTest is ArLogicalEntry {
  return isLogicalOperator(toTest[0]);
}
