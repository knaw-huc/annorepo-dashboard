import { QueryState } from "../QuerySlice.ts";
import { SubqueryUpdate } from "../SubqueryUpdate.ts";
import { get, set } from "lodash";
import { validateQuery } from "./validateQuery.ts";

export function updateSubquery(
  update: SubqueryUpdate,
  prev: QueryState,
): QueryState {
  const { path, param, form, errors } = update;

  const prevSubquery = get(prev.subqueries, path);
  const subqueryUpdate = { ...prevSubquery };
  subqueryUpdate.form = form ?? prevSubquery.form;
  subqueryUpdate.errors = errors ?? prevSubquery.errors;
  subqueryUpdate.param = param ?? prevSubquery.param;

  const subqueriesUpdate = structuredClone(prev.subqueries);
  set(subqueriesUpdate, path, subqueryUpdate);

  if (!subqueryUpdate.errors.field) {
    // Check updated subquery does not invalidate query:
    subqueryUpdate.errors.field = validateQuery(subqueriesUpdate);
  }

  return {
    ...prev,
    subqueries: subqueriesUpdate,
  };
}
