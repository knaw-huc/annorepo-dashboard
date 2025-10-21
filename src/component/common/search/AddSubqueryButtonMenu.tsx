import { PropertyName } from "lodash";
import { LogicalOperator } from "../../../model/query/operator/Operator.ts";
import { useAddComparisonSubquery } from "./useAddComparisonSubquery.tsx";
import { useAddLogicalSubquery } from "./useAddLogicalSubquery.tsx";
import { NeutralButton } from "../NeutralButton.tsx";
import { operatorToLabel } from "./LogicalOperatorTitle.tsx";

export function AddSubqueryButtonMenu(props: {
  disabled?: boolean;
  path: PropertyName[];
}) {
  const { path, disabled } = props;
  const addComparisonSubquery = useAddComparisonSubquery();
  const addLogicalSubquery = useAddLogicalSubquery();

  return (
    <div className="flex gap-2">
      <NeutralButton
        borderColor="border-anrep-pink-200"
        disabled={disabled}
        onClick={() => addComparisonSubquery(path, true)}
      >
        Create comparison
      </NeutralButton>
      <NeutralButton
        borderColor="border-anrep-pink-200"
        disabled={disabled}
        onClick={() => addLogicalSubquery(path, LogicalOperator.and)}
      >
        Create {operatorToLabel[LogicalOperator.and]}
      </NeutralButton>
      <NeutralButton
        borderColor="border-anrep-pink-200"
        disabled={disabled}
        onClick={() => addLogicalSubquery(path, LogicalOperator.or)}
      >
        Create {operatorToLabel[LogicalOperator.or]}
      </NeutralButton>
    </div>
  );
}
