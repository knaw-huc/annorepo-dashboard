import {useDashboardStore} from "../../DashboardStore.ts";
import {
  FieldQueryForm,
  ValueParam
} from "../../../component/common/search/QueryModel.ts";
import {SearchQuery} from "../../../client/ArModel.ts";
import {toSearchQuery} from "../util/toSearchQuery.ts";

export const useTemplate = useDashboardStore(store => toTemplateByParams(store.forms, store.params))

export function toTemplateByParams(
  forms: FieldQueryForm[],
  params: ValueParam[]
): SearchQuery {
  const withParams = forms.map((form, i) => ({
    ...form,
    value: params[i] === false
      ? form.value
      : params[i]
  }))
  return toSearchQuery(withParams);
}