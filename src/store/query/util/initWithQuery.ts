import { ArQuery } from "../../../model/ArModel.ts";
import { QueryState } from "../QuerySlice.ts";
import { toQuery } from "./toQuery.ts";

export function initWithQuery(query: ArQuery): QueryState {
  const subqueries = toQuery(query);
  return {
    subqueries,
  };
}
