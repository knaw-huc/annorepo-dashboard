import { useStore } from "../../../store/useStore.ts";
import { PropertyName } from "lodash";
import { LogicalOperator } from "../../../model/query/operator/Operator.ts";
import { LogicalSubquery } from "../../../model/query/QueryModel.ts";

export function useAddLogicalSubquery() {
  const { addSubquery } = useStore();

  return (path: PropertyName[], operator: LogicalOperator) => {
    const subquery: LogicalSubquery = {
      type: "logical",
      operator,
      forms: [],
      queryError: "",
    };
    addSubquery({ path, subquery });
  };
}
