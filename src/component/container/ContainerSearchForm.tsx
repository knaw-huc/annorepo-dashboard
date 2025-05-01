import {InputWithLabel} from "../common/InputWithLabel.tsx";
import {useState} from "react";
import {Warning} from "../common/Warning.tsx";
import {Button} from "../common/Button.tsx";
import {
  QueryOperatorOrFn,
  queryOperatorOrFnValues,
  toOperator
} from "../../client/ArModel.ts";
import {Search} from "../common/icon/Search.tsx";

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
  onSubmit: (value: FieldQueryForm) => void;
}) {

  const [form, setForm] = useState(defaultForm)
  const handleSubmit = () => {
    props.onSubmit(form)

  }
  return <form>
    {/* TODO: create fields dropdown or autocomplete */}
    <InputWithLabel
      value={form.field}
      label="Field"
      onChange={field => setForm({...form, field})}
    />
    <OperatorField
      value={form.operator}
      label="Operator"
      onChange={operator => setForm({...form, operator})}
    />
    <InputWithLabel
      value={form.value}
      label="Field"
      onChange={value => setForm({...form, value})}
    />
    <Button
      onClick={handleSubmit}
      className="my-2"
    >
      Search
      <Search className="ml-1"/>
    </Button>
  </form>

}

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
      const options = queryOperatorOrFnValues.join(', ');
      setError(`Operator '${value}' expected to be one of ${options}`)
    } else {
      props.onChange(operator)
    }
  }
  return <>
    {error && <Warning>{error}</Warning>}
    <InputWithLabel
      value={value}
      label="Operator"
      onChange={handleChange}
    /></>
}