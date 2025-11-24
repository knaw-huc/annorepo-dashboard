import { ComparisonOperator } from "../../../../model/query/operator/Operator.ts";
import { ComparisonSubquery } from "../../../../model/query/QueryModel.ts";
import { ParamValue } from "../../../../model/query/ParamValue.ts";
import { findMapperByValue } from "../../../../model/query/value/util/findMapperByValue.ts";

export function createComparison(
  field: string,
  operator: ComparisonOperator,
  value: string | number,
  param?: ParamValue,
): ComparisonSubquery {
  const mapper = findMapperByValue(value);
  return {
    type: "comparison",
    form: {
      field,
      operator,
      inputValue: mapper.toInputValue(value),
      valueType: mapper.type,
    },
    queryError: "",
    errors: {
      field: "",
      operator: "",
      inputValue: "",
      valueType: "",
    },
    param: param !== undefined ? param : false,
    isPristine: false,
  };
}
