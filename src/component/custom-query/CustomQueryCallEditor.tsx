import {CustomQueryForm, QueryValue} from "../../client/ArModel.ts";
import {CustomSubQueryEditor} from "../common/search/CustomSubQueryEditor.tsx";
import {useStore} from "../../store/useStore.ts";

export function CustomQueryCallEditor() {

  const {updateForm, forms, errors, params} = useStore()

  const handleChangeSubquery = (
    formIndex: number,
    valueUpdate: QueryValue
  ) => {
    const form = {...forms[formIndex], value: valueUpdate}
    updateForm({formIndex, form})
  }

  return <>
    {forms.map((form, i) => <CustomSubQueryEditor
      key={i}
      form={form}
      errors={errors[i]}
      onChange={(value) => handleChangeSubquery(i, value)}
      param={params[i]}
      disabled={params[i] === false}
    />)}
  </>
}

export const defaultCustomQueryForm: CustomQueryForm = {
  name: "name-of-custom-query",
  description: "Description of custom query",
  label: "Label of custom query",
  public: true,
}
