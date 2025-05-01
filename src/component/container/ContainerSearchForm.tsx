import {InputWithLabel} from "../common/form/InputWithLabel.tsx";
import {useState} from "react";
import {Warning} from "../common/Warning.tsx";
import {Button} from "../common/Button.tsx";
import {
  QueryOperatorOrFn,
  queryOperatorOrFnValues,
  toOperator
} from "../../client/ArModel.ts";
import {Search} from "../common/icon/Search.tsx";
import {Dropdown} from "../common/form/Dropdown.tsx";
import {orThrow} from "../../util/orThrow.ts";
import {SearchWithSuggestions} from "../common/form/SearchWithSuggestions.tsx";

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
    <Button
      onClick={handleSubmit}
      className="mt-2"
    >
      Search
      <Search className="ml-1"/>
    </Button>
    <div className="flex mb-5 mt-2">
      <div className="flex-auto">
        <SearchWithSuggestions
          label="Field"
          value={form.field}
          suggestions={['foo', 'blarp']}
          onChange={field => setForm({...form, field})}
        />
      </div>
      {/* TODO: create fields dropdown or autocomplete */}
      <div className="flex-none">
        <p className="text-sm text-gray-500 top-4 z-10 origin-[0] start-2.5 scale-75 ">Operator</p>
        <Dropdown
          selectedValue={form.operator.valueOf()}
          options={operatorOptions}
          onSelect={update => setForm({
            ...form,
            operator: toOperator(update.value)
              ?? orThrow(`Invalid operator: ${update.value}`)
          })}
        />
      </div>
      <div className="flex-auto">
        <InputWithLabel
          value={form.value}
          label="Value"
          onChange={value => setForm({...form, value})}
        />
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