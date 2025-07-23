import { useStore } from "../../../store/useStore.ts";
import { createInputValue } from "./util/createInputValue.tsx";
import { DropdownInput } from "../form/DropdownInput.tsx";
import { DropdownSelector } from "../form/DropdownSelector.tsx";
import {
  QueryValueType,
  queryValueTypes,
} from "../../../model/query/value/QueryValueType.ts";
import { queryOperatorValueType } from "../../../model/query/value/queryOperatorValueType.ts";
import { findMapperByValueType } from "../../../model/query/value/util/findMapperByValueType.ts";
import { SelectOption } from "../form/SelectOption.tsx";
import { QueryValue } from "../../../model/query/value/QueryValue.ts";
import { findMapperByValue } from "../../../model/query/value/util/findMapperByValue.ts";
import { findMapperByOperator } from "../../../model/query/value/util/findMapperByOperator.ts";
import { PropertyName } from "lodash";
import { getComparisonSubquery } from "./getComparisonSubquery.ts";

export function QueryValueInput(props: {
  path: PropertyName[];
  /**
   * Creating a query to call? Versus creating a new custom query
   */
  isCall: boolean;
  isCustom: boolean;
  suggestions: SelectOption<QueryValue>[];
}) {
  const { path, isCall, isCustom, suggestions } = props;

  const { subqueries, updateSubquery } = useStore();

  const subquery = getComparisonSubquery(subqueries, path);
  const param = subquery.param;

  function handleValueChange(inputValueUpdate: string) {
    try {
      const mapper = findMapperByValueType(subquery.form.valueType);
      const queryValueUpdate = mapper.toValue(inputValueUpdate);
      updateSubquery({
        path,
        form: { ...subquery.form, value: queryValueUpdate },
        errors: { ...subquery.errors, value: "" },
      });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "Invalid value";
      updateSubquery({
        path,
        // Use inout value when query value conversion failed:
        form: { ...subquery.form, value: inputValueUpdate },
        errors: { ...subquery.errors, value: errorMessage },
      });
    }
  }

  function handleTypeChange(typeUpdate: QueryValueType) {
    try {
      const newMapper = findMapperByValueType(typeUpdate);
      const queryValueUpdate = newMapper.toValue(inputValue);
      updateSubquery({
        path,
        form: {
          ...subquery.form,
          value: queryValueUpdate,
          valueType: typeUpdate,
        },
        errors: { ...subquery.errors, value: "" },
      });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "Invalid value";
      updateSubquery({
        path,
        // Use inout value when query value conversion failed:
        form: {
          ...subquery.form,
          value: inputValue,
          valueType: typeUpdate,
        },
        errors: { ...subquery.errors, value: errorMessage },
      });
    }
  }

  function handleSelect(update: SelectOption<QueryValue>) {
    try {
      const updateMapper = findMapperByValue(update.value);

      const valueTypeUpdate = updateMapper.type;
      const allowedTypes = queryOperatorValueType[subquery.form.operator];
      let valueUpdate;
      if (allowedTypes.includes(valueTypeUpdate)) {
        valueUpdate = update.value;
      } else {
        const currentMapper = findMapperByOperator(subquery.form.operator);
        valueUpdate = currentMapper.toValue(
          updateMapper.toInputValue(update.value),
        );
      }

      updateSubquery({
        path,
        form: {
          ...subquery.form,
          value: valueUpdate,
          valueType: valueTypeUpdate,
        },
        errors: { ...subquery.errors, value: "" },
      });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "Invalid value";
      updateSubquery({
        path,
        // Use inout value when query value conversion failed:
        form: { ...subquery.form, value: update.value },
        errors: { ...subquery.errors, value: errorMessage },
      });
    }
  }

  const inputValue = createInputValue(
    subquery.form,
    subquery.errors.value,
    param,
    path,
    isCall,
  );

  const disabled = !isCall || (isCustom && param === false);

  const allowedTypes = queryOperatorValueType[subquery.form.operator];
  const valueTypeOptions = queryValueTypes
    .filter((type) => allowedTypes.includes(type))
    .map((type) => ({ value: type, label: type }));

  return (
    <div className="flex gap-2">
      <DropdownInput
        className="flex-1"
        value={inputValue}
        suggestions={suggestions}
        onInputChange={handleValueChange}
        onSelect={handleSelect}
        label="Value"
        errorLabel={subquery.errors.value}
        disabled={disabled}
      />
      <DropdownSelector
        options={valueTypeOptions}
        selectedValue={subquery.form.valueType}
        onSelect={(option) => handleTypeChange(option.value)}
        disabled={disabled || valueTypeOptions.length < 2}
      />
    </div>
  );
}
