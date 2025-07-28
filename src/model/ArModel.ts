import { RangeQueryOperator } from "./query/operator/RangeQueryOperator.ts";
import {
  isLogicalOperator,
  LogicalOperator,
  Operator,
} from "./query/operator/Operator.ts";
import { QueryValue } from "./query/value/QueryValue.ts";
import { Any } from "./Any.ts";

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

export type ArAnnotation<T extends object = object> = {
  "@context": "http://www.w3.org/ns/anno.jsonld";

  id: string;
  via?: string;

  type: string;
  body: T;
  target: string | object;
};

export type ArContainerFields = Record<string, number>;

export type ArQuery = Record<string, Any>;

export type ArCustomQueryForm = {
  name: string;
  description: string;
  label: string;
  public: boolean;

  /**
   * {@link ArQuery}
   */
  query: string;
};

export type ArCustomQueryResult = Omit<ArCustomQueryForm, "query"> & {
  created: string;
  createdBy: string;
  queryTemplate: string;
  parameters: string[];
};

export type ArQueryEntry = ArComparisonEntry | ArLogicalEntry;

export type EntryToRecord<ENTRY extends [Any, Any]> = {
  [KEY in ENTRY[0]]: ENTRY[1];
};

export type ArField = string;
export type ArSubqueryRecord = ArComparisonRecord | ArLogicalRecord;

export type ArSimpleEntry = [ArField, string];
export type ArSimpleSubquery = EntryToRecord<ArSimpleEntry>;

export type ArExtendedValue = Partial<Record<Operator, QueryValue>>;
export type ArExtendedEntry = [ArField, ArExtendedValue];
export type ArExtendedSubquery = EntryToRecord<ArExtendedEntry>;

export type ArRangeEntry = [RangeQueryOperator, ArRangeQueryValue];

export type ArComparisonEntry = ArRangeEntry | ArExtendedEntry | ArSimpleEntry;
export function isArComparisonEntry(
  toTest: ArQueryEntry,
): toTest is ArComparisonEntry {
  return !isArLogicalEntry(toTest);
}

export type ArComparisonValue = ArComparisonEntry[1];
export type ArComparisonRecord = EntryToRecord<ArComparisonEntry>;

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

export type ArLogicalEntry = [LogicalOperator, ArSubqueryRecord];

// Use interface to prevent circular dependency (TS2456)
export interface ArLogicalRecord {
  [LogicalOperator.or]?: ArSubqueryRecord[];
  [LogicalOperator.and]?: ArSubqueryRecord[];
}

export function isArLogicalEntry(
  toTest: ArQueryEntry,
): toTest is ArLogicalEntry {
  return isLogicalOperator(toTest[0]);
}
