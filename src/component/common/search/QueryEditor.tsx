import { SubqueryEditor } from "./SubqueryEditor.tsx";
import { useStore } from "../../../store/useStore.ts";
import { useContainerFields } from "../../../client/endpoint/useContainerFields.tsx";
import { isLogicalSubquery } from "../../../model/query/QueryModel.ts";

export function QueryEditor(props: { containerName: string }) {
  const { containerName } = props;

  const { data: containerFields } = useContainerFields(containerName);
  const fieldNames = containerFields ? Object.keys(containerFields) : [];

  const { subqueries } = useStore();

  return (
    <div>
      {subqueries.map((_, i) => {
        const subquery = subqueries[i];

        if (isLogicalSubquery(subquery)) {
          return <p key={i}>{subquery.operator}</p>;
        }
        return (
          <SubqueryEditor
            key={i}
            containerName={containerName}
            fieldNames={fieldNames}
            path={[i]}
          />
        );
      })}
    </div>
  );
}
