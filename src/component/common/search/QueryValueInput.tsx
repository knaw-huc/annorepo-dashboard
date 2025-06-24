import {InputWithLabel} from "../form/InputWithLabel.tsx";
import {useStore} from "../../../store/useStore.ts";
import {findMapper} from "./util/findMapper.tsx";
import {createInputValue} from "./util/createInputValue.tsx";
import {isEmpty} from "lodash";
import {DropdownItem} from "../form/DropdownItem.tsx";
import {useState} from "react";

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
  const [isOpen, setOpen] = useState(false);

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

  const handleSelect = (suggestion: string) => {
    setOpen(false)
    handleChange(suggestion);
  }

  const inputValue = createInputValue(
    form, error.value, param, formIndex, isCall
  )

  let dropdownClassname = "absolute left-0 z-20 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden";
  if (!isOpen) {
    dropdownClassname += ' hidden'
  }

  const disabled = !isCall || (isCustom && param === false);
  return <div className="relative">
    <InputWithLabel
      label="Value"
      value={inputValue}
      errorLabel={error.value}
      onChange={handleChange}
      disabled={disabled}
      onFocus={() => setOpen(true)}
      // Use timeout to prevent suggestions to disappear before being clicked:
      onBlur={() => setTimeout(() => setOpen(false), 200)}
    />
    {!isEmpty(suggestions) && <ul
      className={dropdownClassname}
    >
      <div className="py-1" role="none">
        {suggestions.map(s =>
          <DropdownItem
            key={s}
            label={s}
            onClick={() => handleSelect(s)}
          />
        )}
      </div>
    </ul>}
  </div>
}

