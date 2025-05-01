import {InputWithLabel} from "../common/form/InputWithLabel.tsx";
import {useState} from "react";
import {Warning} from "../common/Warning.tsx";
import {Button} from "../common/Button.tsx";
import {
  QueryOperatorOrFn,
  queryOperatorOrFnValues,
  toOperator
} from "../../client/ArModel.ts";
import {Dropdown} from "../common/form/Dropdown.tsx";
import {orThrow} from "../../util/orThrow.ts";
import {SearchWithSuggestions} from "../common/form/SearchWithSuggestions.tsx";
import {useContainerFields} from "../../client/endpoint/useContainerFields.tsx";
import {Next} from "../common/icon/Next.tsx";
import {SelectOption} from "../common/form/SelectOption.tsx";

export type FieldQueryForm = {
  field: string,
  operator: QueryOperatorOrFn
  value: string
}

const defaultForm: FieldQueryForm = {
  field: '',
  operator: QueryOperatorOrFn.none,
  value: ''
};

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
    return setForm({
      ...form,
      operator: toOperator(update.value)
        ?? orThrow(`Invalid operator: ${update.value}`)
    });
  }

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
        <p
          className="text-sm text-gray-500 top-4 z-10 origin-[0] start-2.5 scale-75 ">Operator</p>
        <Dropdown
          selectedValue={form.operator.valueOf()}
          options={operatorOptions}
          onSelect={handleSelectOperator}
        />
      </div>
      <div className="flex-auto">
        <InputWithLabel
          value={form.value}
          label="Value"
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


const operatorOptions = Object
  .values(QueryOperatorOrFn)
  .map(v => ({
    label: v,
    value: v
  }))

export function OperatorField(props: {
  value: string,
  label: string
  onChange: (operator: QueryOperatorOrFn) => void
}) {
  const [value, setValue] = useState(props.value)
  const [error, setError] = useState('')
  const handleChange = (update: string) => {
    const operator = toOperator(update)
    setValue(value)
    if (!operator) {
      const options = queryOperatorOrFnValues.map(v => `${v}`).join(', ');
      setError(`Operator '${value}' expected to be one of: ${options}`)
    } else {
      props.onChange(operator)
    }
  }
  return <>
    {error && <Warning className="mt-5 mb-2">{error}</Warning>}
    <InputWithLabel
      value={value}
      label="Operator"
      onChange={handleChange}
    /></>
}