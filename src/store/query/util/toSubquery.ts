import {
  ArComparisonEntry,
  ArLogicalEntry,
  ArQueryEntry,
  isArComparisonEntry,
  isArLogicalEntry,
} from "../../../model/ArModel.ts";
import {
  ComparisonSubquery,
  LogicalSubquery,
  Subquery,
} from "../../../model/query/QueryModel.ts";
import { toComparisonForm } from "./toComparisonForm.ts";
import { toErrorRecord } from "./error/toErrorRecord.ts";
import { toQuery } from "./toQuery.ts";

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
  const forms = operands.map((operand) => {
    const subqueries = toQuery(operand, paramNames);
    if (subqueries.length !== 1) {
      throw new Error(
        `Expected ${JSON.stringify(operand)} to contain one subquery`,
      );
    }
    return subqueries[0];
  });
  return { type: "logical", operator, forms, queryError: "" };
}

function toComparisonSubquery(
  entry: ArComparisonEntry,
  paramNames?: string[],
): ComparisonSubquery {
  const form = toComparisonForm(entry, paramNames);
  const queryError = "";
  const errors = toErrorRecord(form);
  const foundParamName = paramNames?.find((paramName) =>
    JSON.stringify(entry).includes(paramName),
  );
  const param = foundParamName ? foundParamName : false;
  return { type: "comparison", form, errors, param, queryError };
}
