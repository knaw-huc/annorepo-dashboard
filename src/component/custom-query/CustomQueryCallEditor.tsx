import {CustomQueryForm} from "../../client/ArModel.ts";
import {CustomSubQueryEditor} from "../common/search/CustomSubQueryEditor.tsx";
import {useStore} from "../../store/useStore.ts";

export function CustomQueryCallEditor() {

  const {forms, params} = useStore()

  return <>
    {forms.map((_, i) => <CustomSubQueryEditor
      key={i}
      formIndex={i}
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
