import {Dropdown} from "../form/Dropdown.tsx";
import {QueryValueInput} from "./QueryValueInput.tsx";
import {QueryFieldInput} from "./QueryFieldInput.tsx";
import noop from "lodash/noop";
import {useStore} from "../../../store/useStore.ts";
import {
  useValueSuggestions
} from "./useValueSuggestions.tsx";

export function CustomSubQueryEditor(props: {
  formIndex: number
  isCall: boolean
  containerName?: string
}) {
  const {formIndex, isCall, containerName} = props;
  const {forms} = useStore()
  const form = forms[formIndex]
  const operatorValue = form.operator.valueOf();

  const valueSuggestions = useValueSuggestions({
    containerName: containerName,
    field: form.field,
    value: form.value,
  })

  return <div className="flex-grow">
    <fieldset>
      <div className="flex mb-3 mt-2">
        <div className="flex-auto mr-2">
          <QueryFieldInput
            value={form.field}
            operator={form.operator}
            // Disabled and cannot be changed:
            onChange={noop}
            disabled={true}
            suggestions={[]}
          />
        </div>
        <div className="flex-none mr-2">
          <Dropdown
            selectedValue={operatorValue}
            options={[{label: operatorValue, value: operatorValue}]}
            onSelect={noop}
            disabled={true}
          />
        </div>
        <div className="flex-auto mr-2">
          <QueryValueInput
            suggestions={valueSuggestions}
            formIndex={formIndex}
            isCall={isCall}
            isCustom={true}
          />
        </div>
      </div>
    </fieldset>
  </div>

}
