import { DropdownSelector } from "../common/form/DropdownSelector.tsx";
import { QueryValueInput } from "../common/search/QueryValueInput.tsx";
import { QueryFieldInput } from "../common/search/QueryFieldInput.tsx";
import noop from "lodash/noop";
import { useStore } from "../../store/useStore.ts";
import { useValueSuggestions } from "../common/search/useValueSuggestions.tsx";
import { PropertyName } from "lodash";
import { getComparisonSubquery } from "../../store/query/util/path/getComparisonSubquery.ts";

export type CustomComparisonSubqueryEditorProps = {
  path: PropertyName[];
  isCall: boolean;
  containerName?: string;
};

export function CustomComparisonSubqueryEditor(
  props: CustomComparisonSubqueryEditorProps,
) {
  const { path, isCall, containerName } = props;
  const { subqueries } = useStore();
  const subquery = getComparisonSubquery(subqueries, path);
  const operatorValue = subquery.form.operator.valueOf();

  const valueSuggestions = useValueSuggestions({
    containerName: containerName,
    field: subquery.form.field,
    value: subquery.form.value,
  });

  return (
    <div className="flex gap-4">
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
              label="Operator"
              selectedValue={operatorValue}
              selectClassName="rounded bg-white border border-anrep-pink-300 px-2 py-1 h-8 text-sm  min-w-20"
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
