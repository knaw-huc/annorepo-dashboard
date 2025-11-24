import { useStore } from "../../../store/useStore.ts";
import { createInputValue } from "./util/createInputValue.tsx";
import { DropdownInput } from "../form/DropdownInput.tsx";
import { DropdownSelector } from "../form/DropdownSelector.tsx";
import {
  QueryValueType,
  queryValueTypes,
} from "../../../model/query/value/QueryValueType.ts";
import { comparisonOperatorValueType } from "../../../model/query/value/comparisonOperatorValueType.ts";
import { SelectOption } from "../form/SelectOption.tsx";
import { QueryValue } from "../../../model/query/value/QueryValue.ts";
import { findMapperByValue } from "../../../model/query/value/util/findMapperByValue.ts";
import { findMapperByOperator } from "../../../model/query/value/util/findMapperByOperator.ts";
import { PropertyName } from "lodash";
import { getComparisonSubquery } from "../../../store/query/util/path/getComparisonSubquery.ts";

export function QueryValueInput(props: {
  path: PropertyName[];
  /**
   * @see createInputValue
   */
  isCall: boolean;
  isCustom: boolean;
  suggestions: SelectOption<QueryValue>[];
}) {
  const { path, isCall, isCustom, suggestions } = props;

  const { subqueries, updateComparisonSubquery } = useStore();

  const subquery = getComparisonSubquery(subqueries, path);
  const param = subquery.param;

  function handleValueChange(inputValueUpdate: string) {
    updateComparisonSubquery({
      path,
      form: { ...subquery.form, inputValue: inputValueUpdate },
      errors: { ...subquery.errors, inputValue: "" },
    });
  }

  function handleTypeChange(typeUpdate: QueryValueType) {
    try {
      updateComparisonSubquery({
        path,
        form: {
          ...subquery.form,
          inputValue,
          valueType: typeUpdate,
        },
        errors: { ...subquery.errors, inputValue: "" },
      });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "Invalid value";
      updateComparisonSubquery({
        path,
        // Use inout value when query value conversion failed:
        form: {
          ...subquery.form,
          inputValue: inputValue,
          valueType: typeUpdate,
        },
        errors: { ...subquery.errors, inputValue: errorMessage },
      });
    }
  }

  function handleSelect(update: SelectOption<QueryValue>) {
    try {
      const updateMapper = findMapperByValue(update.value);

      const valueTypeUpdate = updateMapper.type;
      const allowedTypes = comparisonOperatorValueType[subquery.form.operator];
      let valueUpdate: string;
      if (allowedTypes.includes(valueTypeUpdate)) {
        valueUpdate = updateMapper.toInputValue(update.value);
      } else {
        const currentMapper = findMapperByOperator(subquery.form.operator);
        valueUpdate = currentMapper.toInputValue(
          updateMapper.toInputValue(update.value),
        );
      }

      updateComparisonSubquery({
        path,
        form: {
          ...subquery.form,
          inputValue: valueUpdate,
          valueType: valueTypeUpdate,
        },
        errors: { ...subquery.errors, inputValue: "" },
      });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "Invalid value";
      updateComparisonSubquery({
        path,
        // Use inout value when query value conversion failed:
        form: { ...subquery.form, inputValue: JSON.stringify(update.value) },
        errors: { ...subquery.errors, inputValue: errorMessage },
      });
    }
  }

  const inputValue = createInputValue(
    subquery.form,
    subquery.errors.inputValue,
    param,
    path,
    isCall,
  );
  const disabled = !isCall || (isCustom && param === false);

  const allowedTypes = comparisonOperatorValueType[subquery.form.operator];
  const valueTypeOptions = queryValueTypes
    .filter((type) => allowedTypes.includes(type))
    .map((type) => ({ value: type, label: type }));

  return (
    <div className="flex">
      <DropdownInput
        className="flex-1"
        value={inputValue}
        suggestions={suggestions}
        onInputChange={handleValueChange}
        onSelect={handleSelect}
        label="Value"
        errorLabel={subquery.errors.inputValue}
        disabled={disabled}
        groupAt="right"
      />
      <DropdownSelector
        groupAt="left"
        label="Type"
        options={valueTypeOptions}
        selectedValue={subquery.form.valueType}
        selectClassName="border-anrep-pink-300"
        onSelect={(option) => handleTypeChange(option.value)}
        disabled={disabled || valueTypeOptions.length < 2}
      />
    </div>
  );
}
