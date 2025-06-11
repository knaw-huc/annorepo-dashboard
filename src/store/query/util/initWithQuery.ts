import {SearchQuery} from "../../../client/ArModel.ts";
import {toQueryFieldForms} from "./toQueryFieldForm.ts";
import {toErrorRecord} from "./toErrorRecord.ts";

import {ValueParam} from "../../../component/common/search/QueryModel.ts";

export function initWithQuery(query: SearchQuery) {
  const forms = toQueryFieldForms(query)
  const errors = forms.map(f => toErrorRecord(f))
  const params = forms.map(() => false as ValueParam)
  return {
    forms,
    errors,
    params
  };
}