import { DropdownSelector } from "../form/DropdownSelector.tsx";
import { orThrow } from "../../../util/orThrow.ts";
import { SelectOption, toOption } from "../form/SelectOption.tsx";
import { QueryValueInput } from "./QueryValueInput.tsx";
import { QueryFieldInput } from "./QueryFieldInput.tsx";
import { useStore } from "../../../store/useStore.ts";
import { useValueSuggestions } from "./useValueSuggestions.tsx";
import { toParamName } from "../../../store/query/util/toParamName.ts";
import { ComparisonOperator } from "../../../model/query/operator/Operator.ts";
import { toOperator } from "../../../model/query/operator/toOperator.ts";
import { alignFormWithOperator } from "./util/alignFormWithOperator.tsx";
import { PropertyName } from "lodash";
import { getComparisonSubquery } from "../../../store/query/util/path/getComparisonSubquery.ts";
import { Cross } from "../icon/Cross.tsx";

export type ComparisonSubqueryEditorProps = {
  fieldNames: string[];
  path: PropertyName[];
  disabled?: boolean;
  containerName?: string;
};

export function ComparisonSubqueryEditor(props: ComparisonSubqueryEditorProps) {
  const { fieldNames, disabled, path, containerName } = props;

  const { subqueries, removeSubquery, updateComparisonSubquery } = useStore();

  const subquery = getComparisonSubquery(subqueries, path);

  const fieldSuggestions = subquery.form.field
    ? fieldNames.filter((name) => name.includes(subquery.form.field))
    : fieldNames;

  const operatorOptions = Object.values(ComparisonOperator)
    .filter((o) => o !== ComparisonOperator.simpleQuery)
    .map((v) => ({ label: v, value: v }));

  const isExistingField = fieldNames.includes(subquery.form.field);

  const value = subquery.form.value;
  const field = isExistingField ? subquery.form.field : "";
  const valueSuggestions = useValueSuggestions({ containerName, field, value });

  function handleSelectOperator(update: SelectOption<ComparisonOperator>) {
    const operatorUpdate =
      toOperator(update.value) ?? orThrow(`Invalid operator: ${update.value}`);

    const formUpdate = alignFormWithOperator(subquery.form, operatorUpdate);

    updateComparisonSubquery({
      path,
      form: formUpdate,
    });
  }

  function handleChangeField(field: string) {
    const errorUpdate = { ...subquery.errors };
    const formUpdate = { ...subquery.form, field };

    let paramUpdate = subquery.param;
    if (paramUpdate) {
      // Keep param name aligned with field when it already exists:
      paramUpdate = toParamName(formUpdate, path);
    }

    if (!field) {
      errorUpdate.field = "Field cannot be empty";
    } else {
      errorUpdate.field = "";
    }

    updateComparisonSubquery({
      path,
      form: formUpdate,
      errors: errorUpdate,
      param: paramUpdate,
    });
  }

  function handleRemoveSubQuery() {
    return removeSubquery(path);
  }

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="comparison-subquery-editor"
    >
      <fieldset disabled={disabled}>
        <div className="flex flex-end">
          <div className="flex-auto mr-2">
            <QueryFieldInput
              value={subquery.form.field}
              errorLabel={subquery.errors.field || subquery.queryError}
              operator={subquery.form.operator}
              suggestions={fieldSuggestions.map(toOption)}
              onChange={handleChangeField}
              disabled={disabled}
            />
          </div>
          <div className="flex-none mr-2">
            <DropdownSelector
              label="Operator"
              selectClassName="rounded bg-white border border-anrep-pink-300 px-2 py-1 h-8 text-sm  min-w-20"
              selectedValue={subquery.form.operator.valueOf()}
              options={operatorOptions}
              onSelect={handleSelectOperator}
              disabled={disabled}
            />
          </div>
          <div className="flex-auto mr-2">
            <QueryValueInput
              path={path}
              isCall={true}
              isCustom={false}
              suggestions={valueSuggestions}
            />
          </div>

          {!disabled && (
            <div className="flex items-end">
              <span
                className="p-2 cursor-pointer"
                onClick={handleRemoveSubQuery}
              >
                <Cross />
              </span>
            </div>
          )}
        </div>
      </fieldset>
    </form>
  );
}
