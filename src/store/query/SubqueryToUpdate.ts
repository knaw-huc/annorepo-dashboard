import { ComparisonForm } from "../../model/query/QueryModel.ts";
import { PropertyName } from "lodash";
import { FieldSubQueryErrors } from "../../model/query/ErrorRecord.ts";
import { ParamValue } from "../../model/query/ParamValue.ts";

export type SubqueryToUpdate = {
  path: PropertyName[];
  form?: ComparisonForm;
  errors?: FieldSubQueryErrors;
  param?: ParamValue;
  isPristine?: boolean;
};
