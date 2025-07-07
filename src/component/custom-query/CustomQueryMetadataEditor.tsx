import {InputWithLabel} from "../common/form/InputWithLabel.tsx";
import {CheckboxWithLabel} from "../common/form/CheckboxWithLabel.tsx";
import {Textarea} from "../common/form/Textarea.tsx";
import {ErrorRecord} from "../common/search/QueryModel.ts";
import {CustomQueryMetadataForm} from "./model/CustomQueryMetadataForm.ts";

export function CustomQueryMetadataEditor(props: {
  form: CustomQueryMetadataForm
  errors: ErrorRecord<CustomQueryMetadataForm>
  onChange: (update: CustomQueryMetadataForm) => void
  onError: (errors: ErrorRecord<CustomQueryMetadataForm>) => void
  disabled?: boolean
}) {
  const {form, errors, onChange, onError, disabled} = props;

  function handleChangeName(name: string) {
    onError({
      ...errors,
      name: /^[a-zA-Z0-9-.]+$/.test(name)
        ? ''
        : 'Only alpha numeric characters, dots and dashes allowed'
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