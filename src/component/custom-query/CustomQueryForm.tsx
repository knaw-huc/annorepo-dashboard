import {InputWithLabel} from "../common/form/InputWithLabel.tsx";
import {ArCustomQueryForm} from "../../client/ArModel.ts";
import {CheckboxWithLabel} from "../common/form/CheckboxWithLabel.tsx";
import {
  defaultQuery,
  FieldQueryForm
} from "../common/search/SubQuerySearchForm.tsx";
import {Textarea} from "../common/form/Textarea.tsx";
import {H2} from "../common/H2.tsx";
import {SearchForm} from "../common/search/SearchForm.tsx";
import noop from "lodash/noop";
import {Button} from "../common/Button.tsx";
import {Back} from "../common/icon/Back.tsx";
import {Next} from "../common/icon/Next.tsx";

export function CustomQueryForm(props: {
  form: CustomQueryForm
  onChange: (update: CustomQueryForm) => void
  onClickSearch: () => void
}) {
  const {form, onChange} = props;

  return <>
    <H2>Metadata</H2>
    <CustomQueryMetadataForm
      form={form}
      onChange={onChange}
    />
    <H2>Custom Query</H2>
    <SearchForm
      query={form.query}
      fieldNames={[]}
      onChangeQuery={noop}
      onSubmitQuery={noop}
      disabled={true}
    />
    <Button className="pr-5" onClick={props.onClickSearch} secondary><Back className="mr-2"/>Edit query</Button>
    <Button className="ml-3 pl-5" onClick={props.onClickSearch}>Save query<Next className="ml-2"/></Button>
  </>
}

export function CustomQueryMetadataForm(props: {
  form: CustomQueryForm
  onChange: (update: CustomQueryForm) => void
}) {
  const {form, onChange} = props;
  return <div className="flex w-full">
    <div className="flex-grow mr-5">
      <InputWithLabel
        value={form.name}
        label="name"
        onChange={name => onChange({...form, name})}
        className="mb-5"
      />
      <InputWithLabel
        value={form.label}
        label="label"
        onChange={label => onChange({...form, label})}
        className="mb-5"
      />
      <CheckboxWithLabel
        value={form.public}
        label="public"
        onChange={update => onChange({...form, public: update})}
      />

    </div>
    <div className="flex-grow">
      <Textarea
        value={form.description}
        label="description"
        onChange={description => onChange({...form, description})}
      />
    </div>
  </div>
}

export type CustomQueryForm = ArCustomQueryForm

export const defaultCustomQueryForm: CustomQueryForm = {
  name: "Name of custom query",
  description: "Description of custom query",
  label: "Label of custom query",
  public: true,
  query: defaultQuery,
}

export function toTemplate(query: FieldQueryForm): FieldQueryForm {
  const result = {...query};
  const key = result.field
  result.value = `<${key}>`
  return result
}

