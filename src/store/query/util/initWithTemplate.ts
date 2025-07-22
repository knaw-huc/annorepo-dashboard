import {SearchQueryJson} from "../../../model/ArModel.ts";
import {toComparisonSubQueries} from "./toComparisonSubQuery.ts";
import {QueryState} from "../QuerySlice.ts";

export function initWithTemplate(
  template: SearchQueryJson,
  paramNames: string[]
): QueryState {
  const subqueries = toComparisonSubQueries(template, paramNames)
  const params = Object.values(template).map(templateEntryValue => {
    const foundParamName = paramNames.find(
      paramName => JSON.stringify(templateEntryValue).includes(paramName)
    );
    return foundParamName
      ? foundParamName
      : false
  })
  return {
    subqueries,
    params
  };
}
