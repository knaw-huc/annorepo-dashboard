import { PropertyName } from "lodash";
import { useAddComparisonSubquery } from "../common/search/button/AddComparisonSubqueryButton.tsx";
import { useAddLogicalSubquery } from "../common/search/button/AddLogicalSubqueryButton.tsx";
import { SelectOption } from "../common/form/SelectOption.tsx";
import { LogicalOperator } from "../../model/query/operator/Operator.ts";
import { DropdownSelector } from "../common/form/DropdownSelector.tsx";

export function AddSubqueryDropdownMenu({ path }: { path: PropertyName[] }) {
  const addComparisonSubquery = useAddComparisonSubquery();
  const addLogicalSubquery = useAddLogicalSubquery();

  const options: SelectOption[] = [
    { label: "Subquery", value: "subquery" },
    { label: "AND", value: LogicalOperator.and },
    { label: "OR", value: LogicalOperator.or },
  ] as const;

  return (
    <DropdownSelector
      placeholder="Add"
      selectClassName="bg-neutral-100 rounded-full border border-anrep-pink-200 px-3 py-1 text-sm cursor-pointer hover:bg-neutral-50 hover:border-anrep-pink-300 transition text-neutral-800"
      options={options}
      onSelect={(o) => {
        if (o.value === "subquery") {
          addComparisonSubquery(path, false);
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
