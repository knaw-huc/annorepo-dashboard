import { ComparisonForm } from "../../model/query/QueryModel.ts";
import { FieldSubQueryErrors } from "../../model/query/ErrorRecord.ts";
import { ParamValue } from "../../model/query/ParamValue.ts";

export type SubqueryUpdate = {
  formIndex: number;
  form?: ComparisonForm;
  errors?: FieldSubQueryErrors;
  param?: ParamValue;
};
