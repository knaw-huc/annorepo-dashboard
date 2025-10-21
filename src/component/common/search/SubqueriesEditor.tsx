import {
  ComparisonSubqueryEditorProps,
  ComparisonSubqueryEditor,
} from "./ComparisonSubqueryEditor.tsx";
import { useStore } from "../../../store/useStore.ts";
import {
  isComparisonSubquery,
  isLogicalSubquery,
  Subquery,
} from "../../../model/query/QueryModel.ts";
import { getOrThrow } from "../../../store/query/util/path/getOrThrow.ts";
import { LogicalSubqueryEditor } from "./LogicalSubqueryEditor.tsx";
import { formsPropPath } from "../../../store/query/formsPropPath.ts";

export function SubqueriesEditor(props: ComparisonSubqueryEditorProps) {
  const { containerName, fieldNames, path } = props;
  const { subqueries: all } = useStore();
  const subqueries: Subquery[] = getOrThrow(all, path);

  return (
    <>
      {subqueries.map((_, i) => {
        const subqueryPath = [...path, i];
        const subquery = subqueries[i];
        if (isLogicalSubquery(subquery)) {
          return (
            <LogicalSubqueryEditor
              key={i}
              containerName={containerName}
              fieldNames={fieldNames}
              path={subqueryPath}
            >
              <SubqueriesEditor
                containerName={containerName}
                fieldNames={fieldNames}
                path={[...subqueryPath, formsPropPath]}
              />
            </LogicalSubqueryEditor>
          );
        } else if (isComparisonSubquery(subquery)) {
          return (
            <ComparisonSubqueryEditor
              key={i}
              containerName={containerName}
              fieldNames={fieldNames}
              path={subqueryPath}
            />
          );
        } else {
          throw new Error(`Unexpected subquery: ${JSON.stringify(subquery)}`);
        }
      })}
    </>
  );
}
