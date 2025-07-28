import { ArQuery } from "../../../model/ArModel.ts";
import { QueryState } from "../QuerySlice.ts";
import { toQuery } from "./toQuery.ts";

export function initWithTemplate(
  template: ArQuery,
  paramNames: string[],
): QueryState {
  const subqueries = toQuery(template, paramNames);

  return {
    subqueries,
  };
}
