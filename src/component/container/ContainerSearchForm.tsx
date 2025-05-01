import {useState} from "react";
import {Button} from "../common/Button.tsx";
import {QueryOperator, QueryValue, toOperator} from "../../client/ArModel.ts";
import {Dropdown} from "../common/form/Dropdown.tsx";
import {orThrow} from "../../util/orThrow.ts";
import {SearchWithSuggestions} from "../common/form/SearchWithSuggestions.tsx";
import {useContainerFields} from "../../client/endpoint/useContainerFields.tsx";
import {Next} from "../common/icon/Next.tsx";
import {SelectOption} from "../common/form/SelectOption.tsx";
import {QueryValueField, convertValueByOperator} from "./QueryValueField.tsx";

export function ContainerSearchForm(props: {
  containerName: string,
  onSubmit: (value: FieldQueryForm) => void;
}) {
  const {containerName, onSubmit} = props;
  const {data: containerFields} = useContainerFields(containerName);

  const [form, setForm] = useState(defaultForm)
  const handleSubmit = () => {
    onSubmit(form)
  }

  const suggestions = containerFields
    ? Object.keys(containerFields)
    : []

  function handleSelectOperator(update: SelectOption) {
    const operatorUpdate = toOperator(update.value)
      ?? orThrow(`Invalid operator: ${update.value}`);

    return setForm({
      ...form,
      operator: operatorUpdate,
      value: convertValueByOperator(form.value, operatorUpdate)
    });
  }

  const operatorOptions = Object
    .values(QueryOperator)
    .map(v => ({
      label: v,
      value: v
    }))

  return <form>
    <div className="flex mb-5 mt-2">
      <div className="flex-auto">
        <SearchWithSuggestions
          label="Field"
          value={form.field}
          suggestions={suggestions}
          onChange={field => setForm({...form, field})}
        />
      </div>
      <div className="flex-none">
        <Dropdown
          selectedValue={form.operator.valueOf()}
          options={operatorOptions}
          onSelect={handleSelectOperator}
        />
      </div>
      <div className="flex-auto">
        <QueryValueField
          queryValue={form.value}
          onChange={value => setForm({...form, value})}
        />
      </div>
      <div className="flex-none">
        <Button
          onClick={handleSubmit}
          className="mt-2"
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

const defaultForm: FieldQueryForm = {
  field: '',
  operator: QueryOperator.simpleQuery,
  value: ''
};


