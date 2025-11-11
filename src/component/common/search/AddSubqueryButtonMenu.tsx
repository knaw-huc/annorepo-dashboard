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
  const buttonColors =
    "border-anrep-pink-200 hover:border-neutral-400 bg-neutral-100 text-neutral-800";

  return (
    <div className="flex gap-2">
      <NeutralButton
        colors={buttonColors}
        disabled={disabled}
        onClick={() => addComparisonSubquery(path, true)}
      >
        Create comparison
      </NeutralButton>
      <NeutralButton
        colors={buttonColors}
        disabled={disabled}
        onClick={() => addLogicalSubquery(path, LogicalOperator.and)}
      >
        Create {operatorToLabel[LogicalOperator.and]}
      </NeutralButton>
      <NeutralButton
        colors={buttonColors}
        disabled={disabled}
        onClick={() => addLogicalSubquery(path, LogicalOperator.or)}
      >
        Create {operatorToLabel[LogicalOperator.or]}
      </NeutralButton>
    </div>
  );
}
