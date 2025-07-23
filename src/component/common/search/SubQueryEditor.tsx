import { DropdownSelector } from "../form/DropdownSelector.tsx";
import { orThrow } from "../../../util/orThrow.ts";
import { SelectOption, toOption } from "../form/SelectOption.tsx";
import { QueryValueInput } from "./QueryValueInput.tsx";
import { QueryFieldInput } from "./QueryFieldInput.tsx";
import { Button } from "../Button.tsx";
import { Remove } from "../icon/Remove.tsx";
import { useStore } from "../../../store/useStore.ts";
import { useValueSuggestions } from "./useValueSuggestions.tsx";
import { toParamName } from "../../../store/query/util/toParamName.ts";
import { Operator } from "../../../model/query/operator/Operator.ts";
import { toOperator } from "../../../model/query/operator/toOperator.ts";
import { alignFormWithOperator } from "./util/alignFormWithOperator.tsx";

export function SubQueryEditor(props: {
  fieldNames: string[];
  formIndex: number;
  disabled?: boolean;
  containerName?: string;
}) {
  const { fieldNames, disabled, formIndex, containerName } = props;

  const { subqueries, removeSubquery, updateSubquery } = useStore();

  const subquery = subqueries[formIndex];

  const fieldSuggestions = subquery.form.field
    ? fieldNames.filter((name) => name.includes(subquery.form.field))
    : fieldNames;

  const operatorOptions = Object.values(Operator)
    .filter((o) => o !== Operator.simpleQuery)
    .map((v) => ({ label: v, value: v }));

  const isExistingField = fieldNames.includes(subquery.form.field);

  const value = subquery.form.value;
  const field = isExistingField ? subquery.form.field : "";
  const valueSuggestions = useValueSuggestions({ containerName, field, value });

  function handleSelectOperator(update: SelectOption<Operator>) {
    const operatorUpdate =
      toOperator(update.value) ?? orThrow(`Invalid operator: ${update.value}`);

    const formUpdate = alignFormWithOperator(subquery.form, operatorUpdate);
    console.log("handleSelectOperator", { update, formUpdate });

    updateSubquery({
      path: [formIndex],
      form: formUpdate,
    });
  }

  function handleChangeField(field: string) {
    const errorUpdate = { ...subquery.errors };
    const formUpdate = { ...subquery.form, field };

    let paramUpdate = subquery.param;
    if (paramUpdate) {
      // Keep param name aligned with field when it already exists:
      paramUpdate = toParamName(formUpdate, formIndex);
    }

    if (!field) {
      errorUpdate.field = "Field cannot be empty";
    } else {
      errorUpdate.field = "";
    }

    updateSubquery({
      path: [formIndex],
      form: formUpdate,
      errors: errorUpdate,
      param: paramUpdate,
    });
  }

  function handleRemoveSubQuery() {
    return removeSubquery([formIndex]);
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <fieldset disabled={disabled}>
        <div className="flex mb-3 mt-2">
          <div className="flex-auto mr-2">
            <QueryFieldInput
              value={subquery.form.field}
              errorLabel={subquery.errors.field}
              operator={subquery.form.operator}
              suggestions={fieldSuggestions.map(toOption)}
              onChange={handleChangeField}
              disabled={disabled}
            />
          </div>
          <div className="flex-none mr-2">
            <DropdownSelector
              selectedValue={subquery.form.operator.valueOf()}
              options={operatorOptions}
              onSelect={handleSelectOperator}
              disabled={disabled}
            />
          </div>
          <div className="flex-auto mr-2">
            <QueryValueInput
              formIndex={formIndex}
              isCall={true}
              isCustom={false}
              suggestions={valueSuggestions}
            />
          </div>

          {!disabled && (
            <div className="flex-none">
              <Button
                type="button"
                className="pl-3 h-full"
                onClick={handleRemoveSubQuery}
                secondary
              >
                <Remove className="ml-1" />
              </Button>
            </div>
          )}
        </div>
      </fieldset>
    </form>
  );
}
