import { DropdownSelector } from "../form/DropdownSelector.tsx";
import { QueryValueInput } from "./QueryValueInput.tsx";
import { QueryFieldInput } from "./QueryFieldInput.tsx";
import noop from "lodash/noop";
import { useStore } from "../../../store/useStore.ts";
import { useValueSuggestions } from "./useValueSuggestions.tsx";
import { PropertyName } from "lodash";
import { getOrThrow } from "../../../store/query/util/getOrThrow.ts";

export function CustomSubqueryEditor(props: {
  path: PropertyName[];
  isCall: boolean;
  containerName?: string;
}) {
  const { path, isCall, containerName } = props;
  const { subqueries } = useStore();
  const subquery = getOrThrow(subqueries, path);
  const operatorValue = subquery.form.operator.valueOf();

  const valueSuggestions = useValueSuggestions({
    containerName: containerName,
    field: subquery.form.field,
    value: subquery.form.value,
  });

  return (
    <div className="flex-grow">
      <fieldset>
        <div className="flex mb-3 mt-2">
          <div className="flex-auto mr-2">
            <QueryFieldInput
              value={subquery.form.field}
              operator={subquery.form.operator}
              // Disabled and cannot be changed:
              onChange={noop}
              suggestions={[]}
              disabled={true}
            />
          </div>
          <div className="flex-none mr-2">
            <DropdownSelector
              selectedValue={operatorValue}
              options={[{ label: operatorValue, value: operatorValue }]}
              onSelect={noop}
              disabled={true}
            />
          </div>
          <div className="flex-auto mr-2">
            <QueryValueInput
              suggestions={valueSuggestions}
              path={path}
              isCustom={true}
              isCall={isCall}
            />
          </div>
        </div>
      </fieldset>
    </div>
  );
}
