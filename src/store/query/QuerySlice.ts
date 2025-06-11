import {StateCreator} from "zustand";
import {
  ErrorRecord,
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
  errors: ErrorRecord<FieldQueryForm>[]
  params: ValueParam[]
}
export type QuerySlice = QueryState & {
  setState: (update: QueryState) => void
  initWithQuery: (query: SearchQuery) => void
}

export const createQuerySlice: SliceCreator<QuerySlice> = (set) => ({
  forms: [],
  errors: [],
  params: [],

  setState: (update: QueryState) => set(
    () => ({...update})
  ),
  updateForm: (i: number, form: FieldQueryForm, error: ErrorRecord<FieldQueryForm>) => set(
    (prev) => updateForm(i, form, error, prev)
  ),
  initWithQuery: (query: SearchQuery) => set(
    () => initWithQuery(query)
  ),
  initWithTemplate: (query: SearchQuery, params: string[]) => set(
    () => initWithTemplate(query, params)
  )
});

