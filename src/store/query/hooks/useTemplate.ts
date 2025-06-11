import {
  FieldQueryForm,
  ParamValue
} from "../../../component/common/search/QueryModel.ts";
import {SearchQuery} from "../../../client/ArModel.ts";
import {toSearchQuery} from "../util/toSearchQuery.ts";
import {useStore} from "../../useStore.ts";

export const useTemplate = useStore(store => toTemplateByParams(store.forms, store.params))

export function toTemplateByParams(
  forms: FieldQueryForm[],
  params: ParamValue[]
): SearchQuery {
  const withParams = forms.map((form, i) => ({
    ...form,
    value: params[i] === false
      ? form.value
      : params[i]
  }))
  return toSearchQuery(withParams, []);
}