import {ArExtendedFieldQuery} from "../ArModel.ts";
import {Operator} from "./operator/Operator.ts";
import {toQueryFieldForms} from "../../store/query/util/toQueryFieldForm.ts";
import {toParamName} from "../../store/query/util/toParamName.ts";
import {toSearchQuery} from "../../store/query/util/toSearchQuery.ts";

export const defaultQuery: ArExtendedFieldQuery = {field: {[Operator.equal]: "value"}}
export const defaultParams: string[] = toQueryFieldForms(defaultQuery)
  .map((f, i) => toParamName(f, i))
export const defaultTemplate: ArExtendedFieldQuery = toSearchQuery(toQueryFieldForms(defaultQuery)
  .map((f, i) => ({...f, value: toParamName(f, i)})), defaultParams)