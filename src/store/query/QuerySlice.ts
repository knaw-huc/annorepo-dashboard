import {ValidatedComparisonSubQuery} from "../../model/query/QueryModel.ts";
import {SearchQueryJson} from "../../model/ArModel.ts";
import {initWithQuery} from "./util/initWithQuery.ts";
import {initWithTemplate} from "./util/initWithTemplate.ts";
import {updateSubquery} from "./util/updateSubquery.ts";
import {SubqueryUpdate} from "./SubqueryUpdate.ts";
import {addForm} from "./util/addForm.ts";
import {removeForm} from "./util/removeForm.ts";
import {SubqueryToAdd} from "./SubqueryToAdd.ts";
import {SliceCreator} from "./SliceCreator.ts";
import {FormParamValue} from "../../model/query/FormParamValue.ts";

export type QueryState = {
  subqueries: ValidatedComparisonSubQuery[]

  /**
   * The meaning of form values and parameters in the context of global and custom queries:
   * - Meaning of params in a global query:
   *   - nothing
   * - Meaning of params[i] in a custom query:
   *   - falsy param: form value at i is a static value
   *   - truthy param: form value at i is a filled in parameter
   */
  // TODO Move to validated comparison subquery:
  params: FormParamValue[]
}

export type QuerySlice = QueryState & {
  setQueryState: (update: QueryState) => void
  addSubquery: (toAdd: SubqueryToAdd) => void
  removeSubquery: (subqueryIndex: number) => void
  updateSubquery: (update: SubqueryUpdate) => void
  initWithQuery: (query: SearchQueryJson) => void
  initWithTemplate: (query: SearchQueryJson, params: string[]) => void
}

export const createQuerySlice: SliceCreator<QuerySlice> = (set) => {
  return ({
    subqueries: [],
    errors: [],
    params: [],

    setQueryState: (update: QueryState) => set(() =>
      ({...update})
    ),
    addSubquery: (update) => set((prev) =>
      addForm(update, prev)
    ),
    removeSubquery: (toRemove) => set((prev) =>
      removeForm(toRemove, prev)
    ),
    updateSubquery: (update) => set((prev) =>
      updateSubquery(update, prev)
    ),
    initWithQuery: (query) => set(() =>
      initWithQuery(query)
    ),
    initWithTemplate: (query, params) => set(() =>
      initWithTemplate(query, params)
    )
  });

  // @ts-expect-error
  function logSet(mutator: (state: QueryState) => QueryState) {
    set((prev) => {
      const next = mutator(prev);
      console.info('set:', {prev, next})
      return next;
    });
  }

};

