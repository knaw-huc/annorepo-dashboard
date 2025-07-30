import { ComparisonOperator } from "../../../../model/query/operator/Operator.ts";
import { ComparisonSubquery } from "../../../../model/query/QueryModel.ts";
import { ParamValue } from "../../../../model/query/ParamValue.ts";

export function createComparison(
  field: string,
  operator: ComparisonOperator,
  value: string,
  param?: ParamValue,
): ComparisonSubquery {
  return {
    type: "comparison",
    form: {
      field,
      operator,
      value,
      valueType: "string",
    },
    queryError: "",
    errors: {
      field: "",
      operator: "",
      value: "",
      valueType: "",
    },
    param: param !== undefined ? param : false,
  };
}
