import {SearchQuery} from "../../../../client/ArModel.ts";
import {FieldQueryForm} from "../SubQuerySearchForm.tsx";
import {toQueryFieldForm} from "./toQueryFieldForm.ts";

export function toQueryFieldForms(
  query: SearchQuery
): FieldQueryForm[] {
  return Object.entries(query).map((entry) => {
    return toQueryFieldForm(entry)
  })
}