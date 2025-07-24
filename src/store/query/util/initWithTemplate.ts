import { SearchQueryJson } from "../../../model/ArModel.ts";
import { QueryState } from "../QuerySlice.ts";
import { toSubqueries } from "./toSubqueries.ts";

export function initWithTemplate(
  template: SearchQueryJson,
  paramNames: string[],
): QueryState {
  const subqueries = toSubqueries(template, paramNames);

  return {
    subqueries,
  };
}
