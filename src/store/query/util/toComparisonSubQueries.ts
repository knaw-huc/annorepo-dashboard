import { SearchQueryJson } from "../../../model/ArModel.ts";
import { ComparisonSubquery } from "../../../model/query/QueryModel.ts";
import { toComparisonSubQuery } from "./toComparisonSubQuery.ts";

export function toComparisonSubQueries(
  query: SearchQueryJson,
  paramNames?: string[],
): ComparisonSubquery[] {
  return Object.entries(query).map((entry) => {
    return toComparisonSubQuery(entry, paramNames);
  });
}
