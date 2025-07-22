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
  subqueryUpdate.param = param ?? prevSubquery.param

  const subqueriesUpdate = prev.subqueries.map(
    (f, i) => i === formIndex ? subqueryUpdate : f
  );

  return {
    ...prev,
    subqueries: subqueriesUpdate,
  }
}