import {InputWithLabel} from "../common/form/InputWithLabel.tsx";
import {ArCustomQueryForm, CustomQueryForm} from "../../client/ArModel.ts";
import {CheckboxWithLabel} from "../common/form/CheckboxWithLabel.tsx";
import {
  defaultQuery,
  FieldQueryForm,
  SubQuerySearchEditor
} from "../common/search/SubQuerySearchEditor.tsx";
import {Textarea} from "../common/form/Textarea.tsx";
import {H2} from "../common/H2.tsx";
import noop from "lodash/noop";
import {Button} from "../common/Button.tsx";
import {Back} from "../common/icon/Back.tsx";
import {Next} from "../common/icon/Next.tsx";
import {toQueryFieldForms} from "../common/search/util/toQueryFieldForms.ts";
import {MR, usePost} from "../../client/query/usePost.tsx";
import {useQueryClient} from "@tanstack/react-query";
import {toSearchQuery} from "../common/search/util/toSearchQuery.tsx";
import {ErrorRecord} from "../common/form/util/ErrorRecord.ts";
import {invalidateBy} from "../../client/query/useGet.tsx";

export function CustomQueryEditor(props: {
  form: CustomQueryForm
  errors: ErrorRecord<CustomQueryForm>
  onChange: (update: CustomQueryForm) => void
  onError: (errors: ErrorRecord<CustomQueryForm>) => void
  onEditQuery: () => void
  onClose: () => void
  isExistingQuery?: boolean
}) {
  const {form, onChange, isExistingQuery} = props;
  const queryClient = useQueryClient()

  const queryTemplates = toTemplates(toQueryFieldForms(form.query));

  const createCustomQuery: MR<ArCustomQueryForm> = usePost('/global/custom-query')

  const handleSubmit = () => {
    const arCustomQueryForm = {
      ...form,
      query: toSearchQuery(queryTemplates)
      // openapi type says string but AR api expects json:
    } as unknown as string;

    createCustomQuery.mutate({
      params: {},
      body: arCustomQueryForm,
    }, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          predicate: query => invalidateBy(query, 'custom-query')
        })
        props.onClose();
      }
    })
  }

  return <>
    <H2>Metadata</H2>
    <CustomQueryMetadataEditor
      form={form}
      errors={props.errors}
      onError={props.onError}
      onChange={onChange}
      disabled={isExistingQuery}
    />
    <H2>Custom Query</H2>
    {queryTemplates.map((qt, i) => <SubQuerySearchEditor
      key={i}
      fieldNames={[]}
      form={qt}
      errors={{} as ErrorRecord<FieldQueryForm>}
      onChange={noop}
      onError={noop}
      onRemove={noop}
      disabled={true}
    />)}
    <Button
      onClick={props.onEditQuery}
      secondary
      className="pr-5"
    >
      <Back className="mr-2"/>Edit query
    </Button>
    <Button
      onClick={handleSubmit}
      className="ml-3 pl-5"
    >
      Save query<Next className="ml-2"/>
    </Button>
  </>
}

export function CustomQueryMetadataEditor(props: {
  form: CustomQueryForm
  errors: ErrorRecord<CustomQueryForm>
  onChange: (update: CustomQueryForm) => void
  onError: (errors: ErrorRecord<CustomQueryForm>) => void
  disabled?: boolean
}) {
  const {form, errors, onChange, onError, disabled} = props;

  function handleChangeName(name: string) {
    onError({
      ...errors,
      name: /^[a-zA-Z0-9-]+$/.test(name)
        ? ''
        : 'Only alpha numeric characters and dashes allowed'
    })
    onChange({...form, name});
  }

  return <div className="flex w-full">
    <div className="flex-grow mr-5">
      <InputWithLabel
        value={form.name}
        errorLabel={errors.name}
        label="name"
        onChange={handleChangeName}
        className="mb-5"
        disabled={disabled}
      />
      <InputWithLabel
        value={form.label}
        label="label"
        onChange={label => onChange({...form, label})}
        className="mb-5"
        disabled={disabled}
      />
      <CheckboxWithLabel
        value={form.public}
        label="public"
        onChange={update => onChange({...form, public: update})}
        disabled={disabled}
      />

    </div>
    <div className="flex-grow">
      <Textarea
        value={form.description}
        label="description"
        onChange={description => onChange({...form, description})}
        disabled={disabled}
      />
    </div>
  </div>
}

export const defaultCustomQueryForm: CustomQueryForm = {
  name: "name-of-custom-query",
  description: "Description of custom query",
  label: "Label of custom query",
  public: true,
  query: defaultQuery,
}

export function toTemplates(query: FieldQueryForm[]): FieldQueryForm[] {
  return query.map(toTemplate)
}

export function toTemplate(query: FieldQueryForm): FieldQueryForm {
  const result = {...query};
  const key = result.field
  result.value = `<${key}>`
  return result
}

