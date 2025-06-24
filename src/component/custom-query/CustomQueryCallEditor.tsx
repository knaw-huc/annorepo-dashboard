import {CustomQueryForm} from "../../client/ArModel.ts";
import {CustomSubQueryEditor} from "../common/search/CustomSubQueryEditor.tsx";
import {useStore} from "../../store/useStore.ts";

export function CustomQueryCallEditor(props: {
  containerName?: string
}) {

  const {containerName} = props;

  const {forms} = useStore()

  return <div>
    {forms.map((_, i) => <CustomSubQueryEditor
      containerName={containerName}
      key={i}
      formIndex={i}
      isCall={true}
    />)}
  </div>
}

export const defaultCustomQueryForm: CustomQueryForm = {
  name: "name-of-custom-query",
  description: "Description of custom query",
  label: "Label of custom query",
  public: true,
}
