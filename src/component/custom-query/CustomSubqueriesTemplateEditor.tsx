import { PropertyName } from "lodash";
import { useStore } from "../../store/useStore.ts";
import {
  isComparisonSubquery,
  isLogicalSubquery,
  Subquery,
} from "../../model/query/QueryModel.ts";
import { getOrThrow } from "../../store/query/util/path/getOrThrow.ts";
import { LogicalSubqueryEditor } from "../common/search/LogicalSubqueryEditor.tsx";
import { formsPropPath } from "../../store/query/formsPropPath.ts";
import { CustomComparisonSubqueryEditor } from "./CustomComparisonSubqueryEditor.tsx";

export function CustomSubqueriesTemplateEditor(props: {
  path: PropertyName[];
  onParameterChange: (path: PropertyName[], isParam: boolean) => void;
}) {
  const { path } = props;
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
              key={subqueryPath.join()}
              path={subqueryPath}
            >
              <CustomSubqueriesTemplateEditor
                path={[...subqueryPath, formsPropPath]}
                onParameterChange={props.onParameterChange}
              />
            </LogicalSubqueryEditor>
          );
        } else if (isComparisonSubquery(subquery)) {
          return (
            <CustomComparisonSubqueryEditor
              path={subqueryPath}
              isCall={false}
            />
          );
        } else {
          throw new Error(`Unexpected subquery: ${JSON.stringify(subquery)}`);
        }
      })}
    </div>
  );
}
