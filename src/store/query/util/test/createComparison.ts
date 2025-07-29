import { ComparisonOperator } from "../../../../model/query/operator/Operator.ts";
import { ComparisonSubquery } from "../../../../model/query/QueryModel.ts";

export function createComparison(
  field: string,
  operator: ComparisonOperator,
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
    queryError: "",
    errors: {
      field: "",
      operator: "",
      value: "",
      valueType: "",
    },
    param: false,
  };
}
