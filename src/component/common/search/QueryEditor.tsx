import {SubQueryEditor} from "./SubQueryEditor.tsx";
import {useStore} from "../../../store/useStore.ts";
import {
  useContainerFields
} from "../../../client/endpoint/useContainerFields.tsx";

export function QueryEditor(props: {
  containerName: string,
}) {
  const {containerName} = props;

  const {data: containerFields} = useContainerFields(containerName);
  const fieldNames = containerFields ? Object.keys(containerFields) : [];

  const {forms} = useStore();

  return <div>
    {forms.map((_, i) => {
      return <SubQueryEditor
        key={i}
        containerName={containerName}
        fieldNames={fieldNames}
        formIndex={i}
      />;
    })}
  </div>
}
