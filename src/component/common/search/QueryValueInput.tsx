import {useStore} from "../../../store/useStore.ts";
import {findMapper} from "./util/findMapper.tsx";
import {createInputValue} from "./util/createInputValue.tsx";
import {DropdownInput} from "./DropdownInput.tsx";

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

  function handleChange(update: string) {
    try {
      const queryUpdate = findMapper(form.operator).toValue(update);
      updateForm({
        formIndex,
        form: {...form, value: queryUpdate},
        error: {...error, value: ''}
      });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "Invalid value";
      updateForm({
        formIndex,
        form: {...form, value: update},
        error: {...error, value: errorMessage}
      });
    }
  }

  const value = createInputValue(
    form, error.value, param, formIndex, isCall
  )

  const disabled = !isCall || (isCustom && param === false);

  return <DropdownInput
    value={value}
    suggestions={suggestions}
    onChange={handleChange}
    label="Value"
    errorLabel={error.value}
    disabled={disabled}
  />
}

