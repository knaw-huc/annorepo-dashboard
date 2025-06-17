import {Dropdown} from "../form/Dropdown.tsx";
import {QueryValueInput} from "./QueryValueInput.tsx";
import {QueryFieldInput} from "./QueryFieldInput.tsx";
import noop from "lodash/noop";
import {useStore} from "../../../store/useStore.ts";

export function CustomSubQueryEditor(props: {
  formIndex: number
  isCall: boolean
}) {
  const {formIndex, isCall} = props;
  const {forms} = useStore()
  const form = forms[formIndex]
  const operatorValue = form.operator.valueOf();

  return <div className="flex-grow">
    <fieldset>
      <div className="flex mb-3 mt-2">
        <div className="flex-auto mr-2">
          <QueryFieldInput
            value={form.field}
            operator={form.operator}
            suggestions={[]}
            onChange={noop}
            disabled={true}
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
            formIndex={formIndex}
            isCall={isCall}
          />
        </div>
      </div>
    </fieldset>
  </div>

}
