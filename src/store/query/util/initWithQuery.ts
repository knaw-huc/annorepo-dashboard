import {SearchQueryJson} from "../../../model/ArModel.ts";
import {toComparisonSubQueries} from "./toComparisonSubQuery.ts";

import {FormParamValue} from "../../../model/query/FormParamValue.ts";
import {QueryState} from "../QuerySlice.ts";

export function initWithQuery(
  query: SearchQueryJson
): QueryState {
  const subqueries = toComparisonSubQueries(query)
  const params = subqueries.map(() => false as FormParamValue)

  return {
    subqueries,
    params
  };
}