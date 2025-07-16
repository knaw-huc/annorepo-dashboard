import {
  ComparisonSubQuery
} from "../../model/query/QueryModel.ts";
import {FieldSubQueryErrors} from "../../model/query/ErrorRecord.ts";
import {FormParamValue} from "../../model/query/FormParamValue.ts";

export type FormUpdate = {
  formIndex: number,
  form?: ComparisonSubQuery,
  error?: FieldSubQueryErrors,
  param?: FormParamValue
}
