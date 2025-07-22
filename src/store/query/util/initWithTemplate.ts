import {SearchQueryJson} from "../../../model/ArModel.ts";
import {toComparisonSubQueries} from "./toComparisonSubQuery.ts";
import {QueryState} from "../QuerySlice.ts";

export function initWithTemplate(
  template: SearchQueryJson,
  paramNames: string[]
): QueryState {
  const subqueries = toComparisonSubQueries(template, paramNames)
  Object.values(template).map((templateEntryValue, i) => {
    const foundParamName = paramNames.find(
      paramName => JSON.stringify(templateEntryValue).includes(paramName)
    );
    subqueries[i].param = foundParamName
      ? foundParamName
      : false
  })
  return {
    subqueries
  };
}
