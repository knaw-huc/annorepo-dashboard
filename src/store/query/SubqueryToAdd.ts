import {ValidatedComparisonSubQuery} from "../../model/query/QueryModel.ts";
import {FormParamValue} from "../../model/query/FormParamValue.ts";

export type SubqueryToAdd = {
  subquery: ValidatedComparisonSubQuery,
  // TODO: move to form:
  param: FormParamValue
}