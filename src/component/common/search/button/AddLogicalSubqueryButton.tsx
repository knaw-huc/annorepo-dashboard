import { DeprecatedButton } from "../../DeprecatedButton.tsx";
import { Add } from "../../icon/Add.tsx";
import { PropertyName } from "lodash";
import { LogicalOperator } from "../../../../model/query/operator/Operator.ts";
import { useStore } from "../../../../store/useStore.ts";
import { LogicalSubquery } from "../../../../model/query/QueryModel.ts";

export function AddLogicalSubqueryButton(props: {
  disabled?: boolean;
  operator: LogicalOperator;
  path: PropertyName[];
  className?: string;
}) {
  const { disabled, path, operator } = props;
  const { addSubquery } = useStore();

  const addOrSubquery = () => {
    const subquery: LogicalSubquery = {
      type: "logical",
      operator,
      forms: [],
      queryError: "",
    };
    addSubquery({ path, subquery });
  };

  return (
    <DeprecatedButton
      type="button"
      className={`h-full border-b-2 ${props.className}`}
      onClick={addOrSubquery}
      secondary
      disabled={disabled}
    >
      <Add className="mr-2" />
      Add <code>{operator.toUpperCase()}</code>
    </DeprecatedButton>
  );
}
