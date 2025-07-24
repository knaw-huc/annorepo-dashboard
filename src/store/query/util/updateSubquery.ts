import { QueryState } from "../QuerySlice.ts";
import { SubqueryUpdate } from "../SubqueryUpdate.ts";
import { set } from "lodash";
import { getOrThrow } from "./getOrThrow.ts";
import { validateSubquery } from "./validateSubquery.ts";

export function updateSubquery(
  update: SubqueryUpdate,
  prev: QueryState,
): QueryState {
  const { path, param, form, errors } = update;

  const prevSubquery = getOrThrow(prev.subqueries, path);
  const subqueryUpdate = { ...prevSubquery };
  subqueryUpdate.form = form ?? prevSubquery.form;
  subqueryUpdate.errors = errors ?? prevSubquery.errors;
  subqueryUpdate.param = param ?? prevSubquery.param;

  const subqueriesUpdate = structuredClone(prev.subqueries);
  set(subqueriesUpdate, path, subqueryUpdate);

  validateSubquery(subqueryUpdate, subqueriesUpdate);

  return {
    ...prev,
    subqueries: subqueriesUpdate,
  };
}
