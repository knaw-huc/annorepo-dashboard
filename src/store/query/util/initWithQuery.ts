import {SearchQueryJson} from "../../../model/ArModel.ts";
import {QueryState} from "../QuerySlice.ts";
import {toComparisonSubQueries} from "./toComparisonSubQueries.ts";

export function initWithQuery(
  query: SearchQueryJson
): QueryState {
  const subqueries = toComparisonSubQueries(query)
  return {
    subqueries
  };
}