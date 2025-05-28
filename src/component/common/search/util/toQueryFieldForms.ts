import {SearchQuery} from "../../../../client/ArModel.ts";
import {toQueryFieldForm} from "./toQueryFieldForm.ts";
import {FieldQueryForm} from "../QueryModel.ts";

export function toQueryFieldForms(
  query: SearchQuery
): FieldQueryForm[] {
  return Object.entries(query).map((entry) => {
    return toQueryFieldForm(entry)
  })
}