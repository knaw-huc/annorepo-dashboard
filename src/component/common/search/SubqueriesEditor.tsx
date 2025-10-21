import {
  ComparisonSubqueryEditor,
  ComparisonSubqueryEditorProps,
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
import { LogicalOperatorTitle } from "./LogicalOperatorTitle.tsx";
import { LogicalOperator } from "../../../model/query/operator/Operator.ts";

export function SubqueriesEditor(
  props: ComparisonSubqueryEditorProps & { parentOperator: LogicalOperator },
) {
  const { containerName, fieldNames, path } = props;
  const { subqueries: all } = useStore();
  const subqueries: Subquery[] = getOrThrow(all, path);

  function renderSubquery(subquery: Subquery, i: number) {
    const subqueryPath = [...path, i];
    if (isLogicalSubquery(subquery)) {
      return (
        <LogicalSubqueryEditor
          key={i}
          containerName={containerName}
          fieldNames={fieldNames}
          path={subqueryPath}
          className="mt-4"
        >
          <SubqueriesEditor
            parentOperator={subquery.operator}
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
  }

  return (
    <>
      {subqueries.map((e: Subquery, i: number) => {
        return (
          <>
            {i > 0 && <LogicalOperatorTitle operator={props.parentOperator} />}
            {renderSubquery(e, i)}
          </>
        );
      })}
    </>
  );
}
