import {StateCreator} from "zustand";
import {
  FieldQueryErrors,
  FieldQueryForm,
  ValueParam
} from "../../component/common/search/QueryModel.ts";
import {SearchQuery} from "../../client/ArModel.ts";
import {initWithQuery} from "./util/initWithQuery.ts";
import {initWithTemplate} from "./util/initWithTemplate.ts";
import {updateForm} from "./util/updateForm.ts";

export type SliceCreator<SLICE> = StateCreator<SLICE, [], [], SLICE>
export type QueryState = {
  forms: FieldQueryForm[]
  errors: FieldQueryErrors[]
  params: ValueParam[]
}
export type QuerySlice = QueryState & {
  setState: (update: QueryState) => void
  updateForm: (
    formIndex: number,
    form: FieldQueryForm,
    error: FieldQueryErrors
  ) => void
  initWithQuery: (query: SearchQuery) => void
  initWithTemplate: (query: SearchQuery, params: string[]) => void
}

export const createQuerySlice: SliceCreator<QuerySlice> = (set) => ({
  forms: [],
  errors: [],
  params: [],

  setState: (update: QueryState) => set(
    () => ({...update})
  ),
  updateForm: (i, form, error) => set(
    (prev) => updateForm(i, form, error, prev)
  ),
  initWithQuery: (query) => set(
    () => initWithQuery(query)
  ),
  initWithTemplate: (query, params) => set(
    () => initWithTemplate(query, params)
  )
});

