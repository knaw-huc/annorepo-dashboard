import { useContainerFields } from "../../../client/endpoint/useContainerFields.tsx";
import { SubqueriesEditor } from "./SubqueriesEditor.tsx";
import { LogicalOperator } from "../../../model/query/operator/Operator.ts";

export function QueryEditor(props: { containerName: string }) {
  const { containerName } = props;

  const { data: containerFields } = useContainerFields(containerName);
  const fieldNames = containerFields ? Object.keys(containerFields) : [];

  return (
    <SubqueriesEditor
      parentOperator={LogicalOperator.and}
      containerName={containerName}
      fieldNames={fieldNames}
      path={[]}
    />
  );
}
