import { QueryState } from "../QuerySlice.ts";
import { SubqueryToUpdate } from "../SubqueryToUpdate.ts";
import { set } from "lodash";
import { validateSubquery } from "./error/validateSubquery.ts";
import { getComparisonSubquery } from "./path/getComparisonSubquery.ts";
import { revalidateInvalidSubqueries } from "./error/revalidateInvalidSubqueries.ts";

export function updateComparisonSubquery(
  toUpdate: SubqueryToUpdate,
  prev: QueryState,
): QueryState {
  const { path, param, form, errors } = toUpdate;

  const prevSubquery = getComparisonSubquery(prev.subqueries, path);
  const subqueryUpdate = { ...prevSubquery };
  subqueryUpdate.form = form ?? prevSubquery.form;
  subqueryUpdate.errors = errors ?? prevSubquery.errors;
  subqueryUpdate.param = param ?? prevSubquery.param;

  const update = structuredClone(prev.subqueries);
  set(update, path, subqueryUpdate);

  validateSubquery(path, update);
  revalidateInvalidSubqueries(update);

  return {
    ...prev,
    subqueries: update,
  };
}
