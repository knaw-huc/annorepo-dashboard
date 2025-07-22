import {ComparisonSubQueryForm} from "../../model/query/QueryModel.ts";
import {FieldSubQueryErrors} from "../../model/query/ErrorRecord.ts";
import {FormParamValue} from "../../model/query/FormParamValue.ts";

export type SubqueryUpdate = {
  formIndex: number,
  form?: ComparisonSubQueryForm,
  errors?: FieldSubQueryErrors,
  param?: FormParamValue
}
