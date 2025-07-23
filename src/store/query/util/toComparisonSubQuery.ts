import { ArQueryEntry } from "../../../model/ArModel.ts";
import { ComparisonSubquery } from "../../../model/query/QueryModel.ts";
import { toErrorRecord } from "./toErrorRecord.ts";
import { toComparisonForm } from "./toComparisonForm.ts";

export function toComparisonSubQuery(
  query: ArQueryEntry,
  paramNames?: string[],
): ComparisonSubquery {
  const form = toComparisonForm(query, paramNames);
  const errors = toErrorRecord(form);

  const foundParamName = paramNames?.find((paramName) =>
    JSON.stringify(query).includes(paramName),
  );
  const param = foundParamName ? foundParamName : false;
  return { type: "comparison", form, errors, param };
}
