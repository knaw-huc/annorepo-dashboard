import { QueryState } from "../QuerySlice.ts";
import { SubqueryToUpdate } from "../SubqueryToUpdate.ts";
import { set } from "lodash";
import { getOrThrow } from "./getOrThrow.ts";
import { validateSubquery } from "./validateSubquery.ts";

export function updateSubquery(
  toUpdate: SubqueryToUpdate,
  prev: QueryState,
): QueryState {
  const { path, param, form, errors } = toUpdate;

  const prevSubquery = getOrThrow(prev.subqueries, path);
  const subqueryUpdate = { ...prevSubquery };
  subqueryUpdate.form = form ?? prevSubquery.form;
  subqueryUpdate.errors = errors ?? prevSubquery.errors;
  subqueryUpdate.param = param ?? prevSubquery.param;

  const update = structuredClone(prev.subqueries);
  set(update, path, subqueryUpdate);

  validateSubquery(subqueryUpdate, update);

  console.debug(updateSubquery.name, { toUpdate, prev, update });

  return {
    ...prev,
    subqueries: update,
  };
}
