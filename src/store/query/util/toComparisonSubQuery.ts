import {ArQueryEntry} from "../../../model/ArModel.ts";
import {ValidatedComparisonSubQuery} from "../../../model/query/QueryModel.ts";
import {toErrorRecord} from "./toErrorRecord.ts";
import {toComparisonSubQueryForm} from "./toComparisonSubQueryForm.ts";

export function toComparisonSubQuery(
  query: ArQueryEntry,
  paramNames?: string[]
): ValidatedComparisonSubQuery {
  const form = toComparisonSubQueryForm(query, paramNames);
  const errors = toErrorRecord(form);

  const foundParamName = paramNames?.find(
    paramName => JSON.stringify(query).includes(paramName)
  );
  const param = foundParamName ? foundParamName : false
  return {type: "comparison", form, errors, param}
}