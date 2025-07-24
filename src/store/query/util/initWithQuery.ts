import { SearchQueryJson } from "../../../model/ArModel.ts";
import { QueryState } from "../QuerySlice.ts";
import { toSubqueries } from "./toSubqueries.ts";

export function initWithQuery(query: SearchQueryJson): QueryState {
  const subqueries = toSubqueries(query);
  return {
    subqueries,
  };
}
