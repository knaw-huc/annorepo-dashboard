import {InputWithLabel} from "../form/InputWithLabel.tsx";
import {useStore} from "../../../store/useStore.ts";
import {findMapper} from "./util/findMapper.tsx";
import {createInputValue} from "./util/createInputValue.tsx";

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
  } = props;

  const {forms, errors, params, updateForm} = useStore()

  const form = forms[formIndex]
  const error = errors[formIndex]
  const param = params[formIndex]

  // TODO use suggestions:
  console.log('QueryValueInput', props.suggestions)

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

  const inputValue = createInputValue(
    form, error.value, param, formIndex, isCall
  )

  return <InputWithLabel
    label="Value"
    value={inputValue}
    errorLabel={error.value}
    onChange={handleChange}
    disabled={!isCall || (isCustom && param === false)}
  />
}

