import {SearchQueryJson} from "../../../model/ArModel.ts";
import {ValidatedComparisonSubQuery} from "../../../model/query/QueryModel.ts";
import {toComparisonSubQuery} from "./toComparisonSubQuery.ts";

export function toComparisonSubQueries(
  query: SearchQueryJson,
  paramNames?: string[]
): ValidatedComparisonSubQuery[] {
  return Object.entries(query).map((entry) => {
    return toComparisonSubQuery(entry, paramNames)
  })
}