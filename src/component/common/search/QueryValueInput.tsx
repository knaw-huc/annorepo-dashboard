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
import {findMapperByType} from "./util/findMapperByType.tsx";

export function QueryValueInput(props: {
  formIndex: number,
  /**
   * Creating a query to call? Versus creating a new custom query
   */
  isCall: boolean,
  isCustom: boolean,
  suggestions: string[]
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

  function handleChange(
    inputValueUpdate: string,
    /**
     * TODO: hier gebleven
     * Hoe form goed up te daten?
     * Daarna testen of alles nu werkt
     */
    // @ts-ignore
    queryValueTypeUpdate: QueryValueType
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
      onChange={update => handleChange(update, form.valueType)}
      label="Value"
      errorLabel={error.value}
      disabled={disabled}
    />
    <DropdownSelector
      options={valueTypeOptions}
      selectedValue={form.valueType}
      onSelect={update => handleChange(inputValue, update.value as QueryValueType)}
    />
  </div>
}

