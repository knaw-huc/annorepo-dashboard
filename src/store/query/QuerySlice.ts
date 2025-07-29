import { Subquery } from "../../model/query/QueryModel.ts";
import { ArQuery } from "../../model/ArModel.ts";
import { initWithQuery } from "./util/initWithQuery.ts";
import { initWithTemplate } from "./util/initWithTemplate.ts";
import { updateComparisonSubquery } from "./util/updateComparisonSubquery.ts";
import { SubqueryToUpdate } from "./SubqueryToUpdate.ts";
import { addSubquery } from "./util/addSubquery.ts";
import { removeSubquery } from "./util/removeSubquery.ts";
import { SubqueryToAdd } from "./SubqueryToAdd.ts";
import { SliceCreator } from "./SliceCreator.ts";
import { PropertyName } from "lodash";

export type QueryState = {
  subqueries: Subquery[];
};

export type QuerySlice = QueryState & {
  setQueryState: (update: QueryState) => void;

  addSubquery: (toAdd: SubqueryToAdd) => void;
  removeSubquery: (path: PropertyName[]) => void;
  updateComparisonSubquery: (update: SubqueryToUpdate) => void;

  initWithQuery: (query: ArQuery) => void;
  initWithTemplate: (query: ArQuery, params: string[]) => void;
};

export const createQuerySlice: SliceCreator<QuerySlice> = (set) => {
  return {
    subqueries: [],

    setQueryState: (update: QueryState) => set(() => ({ ...update })),
    addSubquery: (update) => set((prev) => addSubquery(update, prev)),
    removeSubquery: (toRemove) => set((prev) => removeSubquery(toRemove, prev)),
    updateComparisonSubquery: (update) =>
      set((prev) => updateComparisonSubquery(update, prev)),
    initWithQuery: (query) => set(() => initWithQuery(query)),
    initWithTemplate: (query, params) =>
      set(() => initWithTemplate(query, params)),
  };

  // @ts-expect-error: for debug purpose
  // eslint-disable-next-line
  function logSet(mutator: (state: QueryState) => QueryState) {
    set((prev) => {
      const next = mutator(prev);
      console.info("set:", { prev, next });
      return next;
    });
  }
};
