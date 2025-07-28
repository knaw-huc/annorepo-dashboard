import {
  ComparisonEditor,
  ComparisonEditorProps,
} from "./ComparisonEditor.tsx";
import { useStore } from "../../../store/useStore.ts";
import {
  isComparisonSubquery,
  isLogicalSubquery,
  Subquery,
} from "../../../model/query/QueryModel.ts";
import { getOrThrow } from "../../../store/query/util/getOrThrow.ts";
import { LogicalSubqueryEditor } from "./LogicalSubqueryEditor.tsx";

export function SubqueriesEditor(props: ComparisonEditorProps) {
  const { containerName, fieldNames, path } = props;
  const { subqueries: all } = useStore();
  const subqueries: Subquery[] = getOrThrow(all, path);

  return (
    <div>
      {subqueries.map((_, i) => {
        const subquery = subqueries[i];
        if (isLogicalSubquery(subquery)) {
          return (
            <LogicalSubqueryEditor
              key={i}
              containerName={containerName}
              fieldNames={fieldNames}
              path={[i]}
            />
          );
        } else if (isComparisonSubquery(subquery)) {
          return (
            <ComparisonEditor
              key={i}
              containerName={containerName}
              fieldNames={fieldNames}
              path={[...path, i]}
            />
          );
        } else {
          throw new Error(`Unexpected subquery: ${JSON.stringify(subquery)}`);
        }
      })}
    </div>
  );
}
