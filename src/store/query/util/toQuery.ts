import {
  ArComparisonEntry,
  ArLogicalEntry,
  ArQueryEntry,
  isArComparisonEntry,
  isArLogicalEntry,
  ArQuery,
} from "../../../model/ArModel.ts";
import {
  ComparisonSubquery,
  LogicalSubquery,
  Subquery,
} from "../../../model/query/QueryModel.ts";
import { objectEntries } from "../../../util/objectEntries.ts";
import { toComparisonForm } from "./toComparisonForm.ts";
import { toErrorRecord } from "./toErrorRecord.ts";

/**
 * From AR to internal query
 * See also {@link toArQuery}
 */
export function toQuery(query: ArQuery, paramNames?: string[]): Subquery[] {
  const result = objectEntries(query).map((entry) => {
    return toSubquery(entry, paramNames);
  });
  console.debug(toQuery.name, { query, paramNames, result });
  return result;
}

export function toSubquery(
  entry: ArQueryEntry,
  paramNames?: string[],
): Subquery {
  if (isArComparisonEntry(entry)) {
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
  const forms = toQuery(operands, paramNames);
  return { type: "logical", operator, forms, error: "" };
}

function toComparisonSubquery(
  entry: ArComparisonEntry,
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
