import {useStore} from "../../../store/useStore.ts";
import {createInputValue} from "./util/createInputValue.tsx";
import {DropdownInput} from "../form/DropdownInput.tsx";
import {DropdownSelector} from "../form/DropdownSelector.tsx";
import {
  QueryValueType,
  queryValueTypes
} from "../../../model/query/value/QueryValueType.ts";
import {
  queryOperatorValueType
} from "../../../model/query/value/queryOperatorValueType.ts";
import {
  findMapperByType
} from "../../../model/query/value/util/findMapperByType.ts";
import {SelectOption} from "../form/SelectOption.tsx";
import {QueryValue} from "../../../model/query/value/QueryValue.ts";
import {
  findMapperByValue
} from "../../../model/query/value/util/findMapperByValue.ts";
import {
  findMapperByOperator
} from "../../../model/query/value/util/findMapperByOperator.ts";

export function QueryValueInput(props: {
  formIndex: number,
  /**
   * Creating a query to call? Versus creating a new custom query
   */
  isCall: boolean,
  isCustom: boolean,
  suggestions: SelectOption<QueryValue>[]
}) {
  const {
    formIndex,
    isCall,
    isCustom,
    suggestions
  } = props;

  const {forms, errors, params, updateForm} = useStore()

  const form = forms[formIndex]
  const error = errors[formIndex]
  const param = params[formIndex]

  function handleValueChange(
    inputValueUpdate: string,
  ) {
    try {
      const queryValueUpdate = findMapperByType(form.valueType)
        .toValue(inputValueUpdate);
      updateForm({
        formIndex,
        form: {...form, value: queryValueUpdate},
        error: {...error, value: ''}
      });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "Invalid value";
      updateForm({
        formIndex,
        // Use inout value when query value conversion failed:
        form: {...form, value: inputValueUpdate},
        error: {...error, value: errorMessage}
      });
    }
  }

  function handleTypeChange(
    typeUpdate: QueryValueType
  ) {
    try {
      const newMapper = findMapperByType(typeUpdate)
      const queryValueUpdate = newMapper.toValue(inputValue)
      console.log('handleTypeChange', {newMapper, queryValueUpdate, inputValue})
      updateForm({
        formIndex,
        form: {
          ...form,
          value: queryValueUpdate,
          valueType: typeUpdate
        },
        error: {...error, value: ''}
      });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "Invalid value";
      updateForm({
        formIndex,
        // Use inout value when query value conversion failed:
        form: {
          ...form,
          value: inputValue,
          valueType: typeUpdate
        },
        error: {...error, value: errorMessage}
      });
    }
  }

  function handleSelect(
    update: SelectOption<QueryValue>,
  ) {

    try {
      const updateMapper = findMapperByValue(update.value)

      const valueTypeUpdate = updateMapper.type
      const allowedTypes = queryOperatorValueType[form.operator]
      let valueUpdate
      if (allowedTypes.includes(valueTypeUpdate)) {
        valueUpdate = update.value
      } else {
        const currentMapper = findMapperByOperator(form.operator)
        valueUpdate = currentMapper.toValue(
          updateMapper.toInputValue(update.value)
        )
      }

      updateForm({
        formIndex,
        form: {...form, value: valueUpdate, valueType: valueTypeUpdate},
        error: {...error, value: ''}
      });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "Invalid value";
      updateForm({
        formIndex,
        // Use inout value when query value conversion failed:
        form: {...form, value: update.value},
        error: {...error, value: errorMessage}
      });
    }
  }

  const inputValue = createInputValue(
    form, error.value, param, formIndex, isCall
  )

  const disabled = !isCall || (isCustom && param === false);

  const allowedTypes = queryOperatorValueType[form.operator]
  const valueTypeOptions = queryValueTypes
    .filter(type => allowedTypes.includes(type))
    .map(type => ({value: type, label: type}));

  return <div className="flex gap-2">
    <DropdownInput
      className="flex-1"
      value={inputValue}
      suggestions={suggestions}
      onInputChange={handleValueChange}
      onSelect={handleSelect}
      label="Value"
      errorLabel={error.value}
      disabled={disabled}
    />
    <DropdownSelector
      options={valueTypeOptions}
      selectedValue={form.valueType}
      onSelect={option => handleTypeChange(option.value)}
      disabled={disabled || valueTypeOptions.length < 2}
    />
  </div>
}

