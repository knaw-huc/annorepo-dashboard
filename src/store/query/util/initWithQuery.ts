import {SearchQueryJson} from "../../../model/ArModel.ts";
import {toComparisonSubQueries} from "./toComparisonSubQuery.ts";
import {QueryState} from "../QuerySlice.ts";

export function initWithQuery(
  query: SearchQueryJson
): QueryState {
  const subqueries = toComparisonSubQueries(query)
  return {
    subqueries
  };
}