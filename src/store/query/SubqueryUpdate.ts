import { ComparisonForm } from "../../model/query/QueryModel.ts";
import { FieldSubQueryErrors } from "../../model/query/ErrorRecord.ts";
import { ParamValue } from "../../model/query/ParamValue.ts";
import { PropertyPath } from "lodash";

export type SubqueryUpdate = {
  path: PropertyPath;
  form?: ComparisonForm;
  errors?: FieldSubQueryErrors;
  param?: ParamValue;
};
