import {QueryState} from "../QuerySlice.ts";
import {SubqueryToAdd} from "../SubqueryToAdd.ts";
import {validateQuery} from "./validateQuery.ts";

export function addForm(
  toAdd: SubqueryToAdd,
  prev: QueryState
): QueryState {
  const {subquery} = toAdd
  const formsUpdate = [...prev.subqueries, subquery];

  if(!subquery.errors.field) {
    // Validate when field does not contain error:
    subquery.errors.field = validateQuery(formsUpdate);
  }

  return {
    ...prev,
    subqueries: formsUpdate
  }
}