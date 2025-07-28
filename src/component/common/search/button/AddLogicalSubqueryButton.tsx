import { Button } from "../../Button.tsx";
import { Add } from "../../icon/Add.tsx";
import { PropertyName } from "lodash";
import { LogicalOperator } from "../../../../model/query/operator/Operator.ts";
import { useStore } from "../../../../store/useStore.ts";
import { LogicalSubquery } from "../../../../model/query/QueryModel.ts";

export const operatorLabels: Record<LogicalOperator, string> = {
  [LogicalOperator.and]: ":AND",
  [LogicalOperator.or]: ":OR",
};

export function AddLogicalSubqueryButton(props: {
  disabled?: boolean;
  operator: LogicalOperator;
  path: PropertyName[];
}) {
  const { disabled, path, operator } = props;
  const { addSubquery } = useStore();

  const addOrSubquery = () => {
    const subquery: LogicalSubquery = {
      type: "logical",
      operator,
      forms: [],
      error: "",
    };
    addSubquery({ path, subquery });
  };

  return (
    <Button
      type="button"
      className="h-full border-b-2"
      onClick={addOrSubquery}
      secondary
      disabled={disabled}
    >
      <Add className="mr-2" />
      Add <code>{operatorLabels[operator]}</code>
    </Button>
  );
}
