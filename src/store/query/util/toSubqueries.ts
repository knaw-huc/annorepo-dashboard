import {
  ArLogicalEntry,
  ArQueryEntry,
  isArCompareEntry,
  isArLogicalEntry,
  SearchQueryJson,
} from "../../../model/ArModel.ts";
import {
  ComparisonSubquery,
  LogicalSubquery,
  Subquery,
} from "../../../model/query/QueryModel.ts";
import { objectEntries } from "../../../util/objectEntries.ts";
import { toComparisonForm } from "./toComparisonForm.ts";
import { toErrorRecord } from "./toErrorRecord.ts";

export function toSubqueries(
  // TODO: replace with ArCompareRecord or 'ArQueryRecord'
  query: SearchQueryJson,
  paramNames?: string[],
): Subquery[] {
  return objectEntries(query).map((entry) => {
    return toSubquery(entry, paramNames);
  });
}

export function toSubquery(
  entry: ArQueryEntry,
  paramNames?: string[],
): Subquery {
  if (isArCompareEntry(entry)) {
    return toComparisonSubquery(entry, paramNames);
  } else if (isArLogicalEntry(entry)) {
    return toLogicalSubquery(entry, paramNames);
  } else {
    throw new Error(`Unhandled subquery type: ${JSON.stringify(entry)}`);
  }
}

function toLogicalSubquery(
  entry: ArLogicalEntry,
  paramNames?: string[],
): LogicalSubquery {
  const [operator, operands] = entry;
  const forms = toSubqueries(operands, paramNames);
  return { type: "logical", operator, forms, error: "" };
}

function toComparisonSubquery(
  entry: ArQueryEntry,
  paramNames?: string[],
): ComparisonSubquery {
  const form = toComparisonForm(entry, paramNames);
  const errors = toErrorRecord(form);
  const foundParamName = paramNames?.find((paramName) =>
    JSON.stringify(entry).includes(paramName),
  );
  const param = foundParamName ? foundParamName : false;
  return { type: "comparison", form, errors, param };
}
