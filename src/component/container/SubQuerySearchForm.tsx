import {QueryOperator, QueryValue, toOperator} from "../../client/ArModel.ts";
import {Dropdown} from "../common/form/Dropdown.tsx";
import {orThrow} from "../../util/orThrow.ts";
import {useContainerFields} from "../../client/endpoint/useContainerFields.tsx";
import {SelectOption} from "../common/form/SelectOption.tsx";
import {QueryValueInput} from "./QueryValueInput.tsx";
import {QueryFieldInput} from "./QueryFieldInput.tsx";

export function SubQuerySearchForm(props: {
  containerName: string,

  form: FieldQueryForm
  onChange: (form: FieldQueryForm) => void;

  errors: FieldQueryFormErrors
  onError: (error: FieldQueryFormErrors) => void;
}) {
  const {containerName, form, onChange, errors, onError} = props;
  const {data: containerFields} = useContainerFields(containerName);

  const fieldNames = containerFields
    ? Object.keys(containerFields)
    : [];
  const suggestions = form.field
    ? fieldNames.filter(name => name.includes(form.field))
    : fieldNames

  function handleSelectOperator(update: SelectOption) {
    const operatorUpdate = toOperator(update.value)
      ?? orThrow(`Invalid operator: ${update.value}`);

    onChange({
      ...form,
      operator: operatorUpdate
    });
  }

  const operatorOptions = Object
    .values(QueryOperator)
    .filter(o => o !== QueryOperator.simpleQuery)
    .map(v => ({
      label: v,
      value: v
    }))

  return <form onSubmit={e => e.preventDefault()}>
    <div className="flex mb-5 mt-2">
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
    </div>
  </form>

}

export type FieldQueryForm = {
  field: string,
  operator: QueryOperator
  value: QueryValue
}
export type FieldQueryFormErrors = Record<keyof FieldQueryForm, string>;
export type FieldQueryFormErrorsByField = {field: string, errors: FieldQueryFormErrors}

export const defaultForm: FieldQueryForm = Object.freeze({
  field: 'type',
  operator: QueryOperator.equal,
  value: 'Annotation'
});

