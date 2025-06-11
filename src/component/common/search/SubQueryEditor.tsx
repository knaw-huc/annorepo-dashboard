import {
  QueryOperator,
  QueryValue,
  toOperator
} from "../../../client/ArModel.ts";
import {Dropdown} from "../form/Dropdown.tsx";
import {orThrow} from "../../../util/orThrow.ts";
import {SelectOption} from "../form/SelectOption.tsx";
import {QueryValueInput} from "./QueryValueInput.tsx";
import {QueryFieldInput} from "./QueryFieldInput.tsx";
import {Button} from "../Button.tsx";
import {Remove} from "../icon/Remove.tsx";
import {ErrorRecord, FieldQueryForm} from "./QueryModel.ts";

export function SubQueryEditor(props: {
  fieldNames: string[],

  form: FieldQueryForm
  errors: ErrorRecord<FieldQueryForm>

  onChange: (form: FieldQueryForm, errors: ErrorRecord<FieldQueryForm>) => void;

  onRemove: () => void
  disabled?: boolean
}) {
  const {fieldNames, form, errors, onChange} = props;

  const suggestions = form.field
    ? fieldNames.filter(name => name.includes(form.field))
    : fieldNames

  function handleSelectOperator(update: SelectOption) {
    const operatorUpdate = toOperator(update.value)
      ?? orThrow(`Invalid operator: ${update.value}`);

    onChange({...form, operator: operatorUpdate}, errors);
  }

  const operatorOptions = Object
    .values(QueryOperator)
    .filter(o => o !== QueryOperator.simpleQuery)
    .map(v => ({label: v, value: v}))

  function handleChangeField(field: string) {
    const formUpdate = {...form, field};
    const errorUpdate = {...errors};
    if (!field) {
      errorUpdate.field = 'Field cannot be empty'
    } else {
      errorUpdate.field = ''
    }
    onChange(formUpdate, errorUpdate);
  }

  function handleChangeValue(
    value: QueryValue,
    error: string
  ) {
    const formUpdate = {...form, value};
    const errorUpdate = {...errors, value: error};
    onChange(formUpdate, errorUpdate)
  }

  return <form onSubmit={e => e.preventDefault()}>
    <fieldset disabled={props.disabled}>
      <div className="flex mb-3 mt-2">
        <div className="flex-auto mr-2">
          <QueryFieldInput
            value={form.field}
            errorLabel={errors.field}
            operator={form.operator}
            suggestions={suggestions}
            onChange={handleChangeField}
            disabled={props.disabled}
          />
        </div>
        <div className="flex-none mr-2">
          <Dropdown
            selectedValue={form.operator.valueOf()}
            options={operatorOptions}
            onSelect={handleSelectOperator}
            disabled={props.disabled}
          />
        </div>
        <div className="flex-auto mr-2">
          <QueryValueInput
            queryValue={form.value}
            operator={form.operator}
            error={errors.value}
            onChange={handleChangeValue}
            disabled={props.disabled}
          />
        </div>
        {!props.disabled && <div className="flex-none">
          <Button
            type="button"
            className="pl-3 h-full"
            onClick={props.onRemove}
            secondary
          >
            <Remove className="ml-1"/>
          </Button>
        </div>}
      </div>
    </fieldset>
  </form>


}
