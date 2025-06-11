import {Dropdown} from "../form/Dropdown.tsx";
import {QueryValueInput} from "./QueryValueInput.tsx";
import {QueryFieldInput} from "./QueryFieldInput.tsx";
import noop from "lodash/noop";
import {FieldQueryErrors, FieldQueryForm} from "./QueryModel.ts";

export function CustomSubQueryEditor(props: {
  form: FieldQueryForm
  onChange: (value: FieldQueryForm['value']) => void;

  errors: FieldQueryErrors
  onError: (error: string) => void;

  disabled: boolean
}) {
  const {form, onChange, errors, disabled} = props;

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
            queryValue={form.value}
            onChange={onChange}
            operator={form.operator}
            error={errors.value}
            disabled={disabled}
          />
        </div>
      </div>
    </fieldset>
  </div>

}
