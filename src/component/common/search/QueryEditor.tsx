import {Button} from "../Button.tsx";
import {Add} from "../icon/Add.tsx";
import {Next} from "../icon/Next.tsx";
import {ReactNode} from "react";
import {toQueryFieldForm} from "../../../store/query/util/toQueryFieldForm.ts";
import {defaultQuery, FieldQueryErrors, FieldQueryForm} from "./QueryModel.ts";
import {SubQueryEditor} from "./SubQueryEditor.tsx";
import {useStore} from "../../../store/useStore.ts";
import {hasErrors} from "../../../store/query/util/hasErrors.ts";
import {mapValues} from "lodash";

export function QueryEditor(props: {
  fieldNames: string[],
  onSubmit: () => void
  searchError?: Error | null,
  moreButtons?: ReactNode
}) {
  const {searchError} = props;
  const {
    forms,
    errors,
    addForm,
    removeForm,
    updateForm,
  } = useStore();

  const handleChangeSubquery = (
    formIndex: number,
    form: FieldQueryForm,
    error: FieldQueryErrors
  ) => {
    updateForm({formIndex, form, error})
  }

  const handleSubmitQuery = () => {
    if (hasErrors(errors)) {
      return;
    }
    props.onSubmit()
  }

  const handleAddSubquery = () => {
    const newQueryEntry = Object.entries(defaultQuery)[0];
    const form = toQueryFieldForm(newQueryEntry)
    const error = mapValues(form, () => '');
    const param = false

    addForm({form, error, param})
  }

  const handleRemoveSubquery = (index: number) => {
    removeForm(index)
  }

  return <div>
    {forms.map((f, i) => {
      return <SubQueryEditor
        key={i}
        fieldNames={props.fieldNames}
        form={f}
        onChange={(f, e) => handleChangeSubquery(i, f, e)}
        errors={errors[i]}
        onRemove={() => handleRemoveSubquery(i)}
      />;
    })}
    <div className="mb-7">
      <Button
        type="button"
        className="pl-3 h-full border-b-2 mr-2"
        onClick={handleAddSubquery}
        secondary
      >
        <Add className="mr-2"/>
        Add subquery
      </Button>

      {props.moreButtons}

      <Button
        disabled={!!searchError || !forms.length || hasErrors(errors)}
        type="button"
        className="pl-5 h-full border-b-2 ml-2"
        onClick={handleSubmitQuery}
      >
        Search
        <Next className="ml-1"/>
      </Button>
    </div>
  </div>
}
