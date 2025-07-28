import { ComparisonEditorProps } from "./ComparisonSubqueryEditor.tsx";
import { useStore } from "../../../store/useStore.ts";
import { getLogicalSubquery } from "../../../store/query/util/getLogicalSubquery.ts";
import { LogicalSubquery } from "../../../model/query/QueryModel.ts";
import { Button } from "../Button.tsx";
import { Remove } from "../icon/Remove.tsx";
import { Warning } from "../Warning.tsx";

import { SubqueriesEditor } from "./SubqueriesEditor.tsx";
import { AddCompareSubqueryButton } from "./button/AddCompareSubqueryButton.tsx";
import { AddLogicalSubqueryButton } from "./button/AddLogicalSubqueryButton.tsx";
import { LogicalOperator } from "../../../model/query/operator/Operator.ts";

export const formsPath: keyof LogicalSubquery = "forms";

export function LogicalSubqueryEditor(props: ComparisonEditorProps) {
  const { containerName, fieldNames, path } = props;
  const { subqueries, removeSubquery } = useStore();
  const subquery = getLogicalSubquery(subqueries, props.path);

  const handleRemove = () => {
    removeSubquery(path);
  };

  const newSubqueryPath = [...path, formsPath, subquery.forms.length];

  return (
    <div className="border border-slate-400 w-full p-2 my-2">
      <div>
        <p>{subquery.operator.toUpperCase()}</p>
        <Button onClick={handleRemove}>
          <Remove />
        </Button>

        <AddCompareSubqueryButton
          path={newSubqueryPath}
          isParam={false}
          disabled={!!subquery.error}
        />
        <AddLogicalSubqueryButton
          path={newSubqueryPath}
          disabled={!!subquery.error}
          operator={LogicalOperator.and}
          className="ml-3"
        />
        <AddLogicalSubqueryButton
          path={newSubqueryPath}
          disabled={!!subquery.error}
          operator={LogicalOperator.or}
          className="ml-3"
        />
      </div>
      {subquery.error && <Warning>{subquery.error}</Warning>}
      <div>
        <SubqueriesEditor
          containerName={containerName}
          fieldNames={fieldNames}
          path={[...path, formsPath]}
        />
      </div>
    </div>
  );
}
