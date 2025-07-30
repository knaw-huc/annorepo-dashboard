import {
  CustomComparisonSubqueryEditor,
  CustomComparisonSubqueryEditorProps,
} from "../common/search/CustomComparisonSubqueryEditor.tsx";
import { useStore } from "../../store/useStore.ts";
import {
  isComparisonSubquery,
  isLogicalSubquery,
  Subquery,
} from "../../model/query/QueryModel.ts";
import { getOrThrow } from "../../store/query/util/path/getOrThrow.ts";
import { LogicalSubqueryEditor } from "../common/search/LogicalSubqueryEditor.tsx";
import { formsPropPath } from "../../store/query/formsPropPath.ts";

export function CustomSubqueriesCallEditor(
  props: CustomComparisonSubqueryEditorProps,
) {
  const { containerName, path, isCall } = props;
  const { subqueries: all } = useStore();
  const subqueries: Subquery[] = getOrThrow(all, path);

  return (
    <div>
      {subqueries.map((_, i) => {
        const subqueryPath = [...path, i];
        const subquery = subqueries[i];
        if (isLogicalSubquery(subquery)) {
          return (
            <LogicalSubqueryEditor
              key={i}
              containerName={containerName}
              path={subqueryPath}
            >
              <CustomSubqueriesCallEditor
                containerName={containerName}
                path={[...subqueryPath, formsPropPath]}
                isCall={true}
              />
            </LogicalSubqueryEditor>
          );
        } else if (isComparisonSubquery(subquery)) {
          return (
            <CustomComparisonSubqueryEditor
              containerName={containerName}
              key={subqueryPath.join("")}
              path={subqueryPath}
              isCall={isCall}
            />
          );
        } else {
          throw new Error(`Unexpected subquery: ${JSON.stringify(subquery)}`);
        }
      })}
    </div>
  );
}
