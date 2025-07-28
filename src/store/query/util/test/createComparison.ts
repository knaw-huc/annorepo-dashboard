import { Operator } from "../../../../model/query/operator/Operator.ts";
import { ComparisonSubquery } from "../../../../model/query/QueryModel.ts";

export function createComparison(
  field: string,
  operator: Operator,
  value: string,
): ComparisonSubquery {
  return {
    type: "comparison",
    form: {
      field,
      operator,
      value,
      valueType: "string",
    },
    errors: {
      field: "",
      operator: "",
      value: "",
      valueType: "",
    },
    param: false,
  };
}
