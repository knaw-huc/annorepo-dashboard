import {StateCreator} from "zustand";
import {
  FieldQueryErrors,
  FieldQueryForm,
  ParamValue
} from "../../component/common/search/QueryModel.ts";
import {SearchQuery} from "../../client/ArModel.ts";
import {initWithQuery} from "./util/initWithQuery.ts";
import {initWithTemplate} from "./util/initWithTemplate.ts";
import {updateForm} from "./util/updateForm.ts";
import {FormUpdate} from "./FormUpdate.ts";
import {addForm} from "./util/addForm.ts";
import {removeForm} from "./util/removeForm.ts";
import {FormToAdd} from "./FormToAdd.ts";

export type SliceCreator<SLICE> = StateCreator<SLICE, [], [], SLICE>

export type QueryState = {
  forms: FieldQueryForm[]
  errors: FieldQueryErrors[]
  params: ParamValue[]
}

export type QuerySlice = QueryState & {
  setState: (update: QueryState) => void
  addForm: (toAdd: FormToAdd) => void
  removeForm: (formIndex: number) => void
  updateForm: (update: FormUpdate) => void
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
  addForm: (update) => set(
    (prev) => addForm(update, prev)
  ),
  removeForm: (toRemove) => set(
    (prev) => removeForm(toRemove, prev)
  ),
  updateForm: (update) => set(
    (prev) => updateForm(update, prev)
  ),
  initWithQuery: (query) => set(
    () => initWithQuery(query)
  ),
  initWithTemplate: (query, params) => set(
    () => initWithTemplate(query, params)
  )
});

