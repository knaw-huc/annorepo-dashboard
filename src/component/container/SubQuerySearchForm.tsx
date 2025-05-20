import {
  FieldQuery,
  QueryOperator,
  QueryValue,
  toOperator
} from "../../client/ArModel.ts";
import {Dropdown} from "../common/form/Dropdown.tsx";
import {orThrow} from "../../util/orThrow.ts";
import {SelectOption} from "../common/form/SelectOption.tsx";
import {QueryValueInput} from "./QueryValueInput.tsx";
import {QueryFieldInput} from "./QueryFieldInput.tsx";
import {Button} from "../common/Button.tsx";
import {Remove} from "../common/icon/Remove.tsx";

export function SubQuerySearchForm(props: {
  fieldNames: string[],

  form: FieldQueryForm
  onChange: (form: FieldQueryForm) => void;

  errors: FieldQueryFormErrors
  onError: (error: FieldQueryFormErrors) => void;

  onRemove: () => void
}) {
  const {fieldNames, form, onChange, errors, onError} = props;

  const suggestions = form.field
    ? fieldNames.filter(name => name.includes(form.field))
    : fieldNames

  function handleSelectOperator(update: SelectOption) {
    const operatorUpdate = toOperator(update.value)
      ?? orThrow(`Invalid operator: ${update.value}`);

    onChange({...form, operator: operatorUpdate});
  }

  const operatorOptions = Object
    .values(QueryOperator)
    .filter(o => o !== QueryOperator.simpleQuery)
    .map(v => ({
      label: v,
      value: v
    }))

  return <form onSubmit={e => e.preventDefault()}>
    <div className="flex mb-3 mt-2">
      <div className="flex-auto mr-2">
        <QueryFieldInput
          value={form.field}
          operator={form.operator}
          suggestions={suggestions}
          onChange={field => {
            onChange({...form, field});
          }}
        />
      </div>
      <div className="flex-none mr-2">
        <Dropdown
          selectedValue={form.operator.valueOf()}
          options={operatorOptions}
          onSelect={handleSelectOperator}
        />
      </div>
      <div className="flex-auto mr-2">
        <QueryValueInput
          queryValue={form.value}
          onChange={value => onChange({...form, value})}
          operator={form.operator}
          error={errors.value}
          onError={error => onError({...errors, value: error})}
        />
      </div>
      <div className="flex-none">
        <Button
          type="button"
          className="pl-3 h-full border-b-2"
          onClick={props.onRemove}
          secondary
        >
          <Remove className="ml-1"/>
        </Button>
      </div>
    </div>
  </form>

}

export type FieldQueryForm = {
  field: string,
  operator: QueryOperator
  value: QueryValue
}
export type FieldQueryFormErrors = Record<keyof FieldQueryForm, string>;
export type FieldQueryFormErrorsByField = {
  field: string,
  errors: FieldQueryFormErrors
}

export const defaultQuery: FieldQuery = {type: {[QueryOperator.equal]: "Annotation"}}

export type QueryEntry = [string, any]