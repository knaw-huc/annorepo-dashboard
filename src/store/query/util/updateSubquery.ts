import {QueryState} from "../QuerySlice.ts";
import {SubqueryUpdate} from "../SubqueryUpdate.ts";

export function updateSubquery(
  update: SubqueryUpdate,
  prev: QueryState
): QueryState {
  const {formIndex, param, form, errors} = update

  const prevSubquery = prev.subqueries[formIndex];
  const subqueryUpdate = {...prevSubquery}
  subqueryUpdate.form = form ?? prevSubquery.form
  subqueryUpdate.errors = errors ?? prevSubquery.errors

  const subqueriesUpdate = prev.subqueries.map(
    (f, i) => i === formIndex ? subqueryUpdate : f
  );
  const paramsUpdate = param !== undefined
    ? prev.params.map(
      (p, i) => i === formIndex ? param : p
    ) : prev.params;

  return {
    ...prev,
    subqueries: subqueriesUpdate,
    // TODO Move to subqueries:
    params: paramsUpdate
  }
}