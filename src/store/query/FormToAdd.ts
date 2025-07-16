import {
  ComparisonSubQuery, ComparisonSubQueryErrors
} from "../../model/query/QueryModel.ts";
import {FormParamValue} from "../../model/query/FormParamValue.ts";

export type FormToAdd = {
  form: ComparisonSubQuery,
  error: ComparisonSubQueryErrors,
  param: FormParamValue
}