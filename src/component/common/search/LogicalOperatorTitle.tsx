import { LogicalOperator } from "../../../model/query/operator/Operator.ts";

const operatorToLabel: Record<LogicalOperator, string> = {
  [LogicalOperator.and]: "AND",
  [LogicalOperator.or]: "OR",
};

export function LogicalOperatorTitle(props: { operator: LogicalOperator }) {
  return (
    <div>
      <div className="font-bold text-anrep-pink-700">
        {operatorToLabel[props.operator]}
      </div>
    </div>
  );
}
