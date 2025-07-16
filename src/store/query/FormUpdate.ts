import {
  ComparisonSubQuery, ComparisonSubQueryErrors
} from "../../model/query/QueryModel.ts";
import {FormParamValue} from "../../model/query/FormParamValue.ts";

export type FormUpdate = {
  formIndex: number,
  form?: ComparisonSubQuery,
  error?: ComparisonSubQueryErrors,
  param?: FormParamValue
}
