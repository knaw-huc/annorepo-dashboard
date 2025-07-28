import { useContainerFields } from "../../../client/endpoint/useContainerFields.tsx";
import { SubqueriesEditor } from "./SubqueriesEditor.tsx";

export function QueryEditor(props: { containerName: string }) {
  const { containerName } = props;

  const { data: containerFields } = useContainerFields(containerName);
  const fieldNames = containerFields ? Object.keys(containerFields) : [];

  return (
    <SubqueriesEditor
      containerName={containerName}
      fieldNames={fieldNames}
      path={[]}
    />
  );
}
