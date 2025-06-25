import {
  FieldQueryForm,
  FormParamValue
} from "../../../component/common/search/QueryModel.ts";
import {toSearchQuery} from "./toSearchQuery.ts";

/**
 * Check if forms and params can be converted into query
 * @returns error message on error
 */
export function validateQuery(
  forms: FieldQueryForm[],
  params: FormParamValue[],
): string {
  try {
    // Computer says ...
    toSearchQuery(forms, params)
    return ''
  } catch (e) {
    return e instanceof Error
      ? e.message
      : 'New subquery causes unknown error'
  }
}