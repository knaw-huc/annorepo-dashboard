import { ComparisonForm } from "../../model/query/QueryModel.ts";
import { FieldSubQueryErrors } from "../../model/query/ErrorRecord.ts";
import { ParamValue } from "../../model/query/ParamValue.ts";
import { PropertyName } from "lodash";

export type SubqueryToUpdate = {
  path: PropertyName[];
  form?: ComparisonForm;
  errors?: FieldSubQueryErrors;
  param?: ParamValue;
};
