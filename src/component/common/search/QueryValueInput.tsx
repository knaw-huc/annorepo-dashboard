import {InputWithLabel} from "../form/InputWithLabel.tsx";
import {useStore} from "../../../store/useStore.ts";
import {findMapping} from "./util/findMapping.tsx";
import {createInputValue} from "./util/createInputValue.tsx";

export function QueryValueInput(props: {
  isCustom: boolean
  formIndex: number,
  disabled?: boolean
}) {
  const {
    formIndex,
    isCustom
  } = props;

  const {forms, errors, params, updateForm} = useStore()

  const form = forms[formIndex]
  const error = errors[formIndex]
  const param = params[formIndex]
  const inputValue = createInputValue(form, error.value, param, isCustom)

  function handleChange(update: string) {
    try {
      const queryUpdate = findMapping(form.operator).toValue(update);
      updateForm({
        formIndex,
        form: {...form, value: queryUpdate},
        error: {...error, value: ''}
      });
    } catch (e) {
      const errorUpdate = e instanceof Error ? e.message : "Invalid value";
      updateForm({
        formIndex,
        form: {...form, value: update},
        error: {...error, value: errorUpdate}
      });
    }
  }

  console.log('QueryValueInput', props, inputValue)

  return <InputWithLabel
    label="Value"
    value={inputValue}
    errorLabel={error.value}
    onChange={handleChange}
    disabled={isCustom}
  />
}

