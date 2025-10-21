import { PropertyName } from "lodash";
import { SelectOption } from "../form/SelectOption.tsx";
import { LogicalOperator } from "../../../model/query/operator/Operator.ts";
import { DropdownSelector } from "../form/DropdownSelector.tsx";
import { useAddComparisonSubquery } from "./useAddComparisonSubquery.tsx";
import { useAddLogicalSubquery } from "./useAddLogicalSubquery.tsx";

export function AddSubqueryDropdownMenu(props: {
  disabled?: boolean;
  path: PropertyName[];
}) {
  const { path, disabled } = props;
  const addComparisonSubquery = useAddComparisonSubquery();
  const addLogicalSubquery = useAddLogicalSubquery();

  const options: SelectOption[] = [
    { label: "Subquery", value: "subquery" },
    { label: "AND", value: LogicalOperator.and },
    { label: "OR", value: LogicalOperator.or },
  ] as const;

  return (
    <DropdownSelector
      disabled={disabled}
      placeholder="+"
      selectClassName="bg-neutral-100 rounded-full border-anrep-pink-200 px-3 hover:bg-neutral-50 hover:border-anrep-pink-300 transition text-neutral-800 text-xl w-16"
      options={options}
      optionClassName="text-3xl"
      onSelect={(o) => {
        if (o.value === "subquery") {
          addComparisonSubquery(path, true);
        } else if (o.value === LogicalOperator.and) {
          addLogicalSubquery(path, LogicalOperator.and);
        } else if (o.value === LogicalOperator.or) {
          addLogicalSubquery(path, LogicalOperator.or);
        } else {
          throw new Error(`Unexpected option: ${o.value}`);
        }
      }}
    />
  );
}
