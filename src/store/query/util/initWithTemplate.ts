import {SearchQueryJson} from "../../../model/ArModel.ts";
import {QueryState} from "../QuerySlice.ts";
import {toComparisonSubQueries} from "./toComparisonSubQueries.ts";

export function initWithTemplate(
  template: SearchQueryJson,
  paramNames: string[]
): QueryState {
  const subqueries = toComparisonSubQueries(template, paramNames)

  return {
    subqueries
  };
}
