import { LogicalOperator } from "../../../../model/query/operator/Operator.ts";
import {
  LogicalSubquery,
  Subquery,
} from "../../../../model/query/QueryModel.ts";

export function createLogical(
  or: LogicalOperator,
  forms: Subquery[],
): LogicalSubquery {
  return {
    type: "logical",
    operator: or,
    error: "",
    forms,
  };
}
