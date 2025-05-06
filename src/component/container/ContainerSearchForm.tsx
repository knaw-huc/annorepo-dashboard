import {Button} from "../common/Button.tsx";
import {QueryOperator, QueryValue, toOperator} from "../../client/ArModel.ts";
import {Dropdown} from "../common/form/Dropdown.tsx";
import {orThrow} from "../../util/orThrow.ts";
import {SearchWithSuggestions} from "../common/form/SearchWithSuggestions.tsx";
import {useContainerFields} from "../../client/endpoint/useContainerFields.tsx";
import {Next} from "../common/icon/Next.tsx";
import {SelectOption} from "../common/form/SelectOption.tsx";
import {convertValueByOperator, QueryValueField} from "./QueryValueField.tsx";
import {FormEvent} from "react";

export function ContainerSearchForm(props: {
  containerName: string,
  form: FieldQueryForm
  onChange: (form: FieldQueryForm) => void;
  onSubmit: () => void;
}) {
  const {containerName, form, onChange} = props;
  const {data: containerFields} = useContainerFields(containerName);

  const onSubmit = (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    props.onSubmit()
  }

  const suggestions = containerFields
    ? Object.keys(containerFields)
    : []

  function handleSelectOperator(update: SelectOption) {
    const operatorUpdate = toOperator(update.value)
      ?? orThrow(`Invalid operator: ${update.value}`);

    onChange({
      ...form,
      operator: operatorUpdate,
      value: convertValueByOperator(form.value, operatorUpdate)
    });
  }

  const operatorOptions = Object
    .values(QueryOperator)
    .filter(o => o !== QueryOperator.simpleQuery)
    .map(v => ({
      label: v,
      value: v
    }))

  return <form onSubmit={onSubmit}>
    <div className="flex mb-5 mt-2">
      <div className="flex-auto mr-2">
        <SearchWithSuggestions
          label="Field"
          value={form.field}
          suggestions={suggestions}
          onChange={field => onChange({...form, field})}
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
        <QueryValueField
          queryValue={form.value}
          onChange={value => onChange({...form, value})}
        />
      </div>
      <div className="flex-none">
        <Button
          type="submit"
          className="pl-5 h-full border-b-2"
          onClick={onSubmit}
        >
          Search
          <Next className="ml-1"/>
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

export const defaultForm: FieldQueryForm = {
  field: 'body.purpose',
  operator: QueryOperator.equal,
  value: 'classifying'
};


