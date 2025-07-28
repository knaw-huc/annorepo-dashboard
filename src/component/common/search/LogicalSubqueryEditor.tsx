import { ComparisonEditorProps } from "./ComparisonEditor.tsx";
import { useStore } from "../../../store/useStore.ts";
import { getLogicalSubquery } from "../../../store/query/util/getLogicalSubquery.ts";
import { LogicalSubquery } from "../../../model/query/QueryModel.ts";
import { Button } from "../Button.tsx";
import { Remove } from "../icon/Remove.tsx";
import { Warning } from "../Warning.tsx";

import { SubqueriesEditor } from "./SubqueriesEditor.tsx";

export function LogicalSubqueryEditor(props: ComparisonEditorProps) {
  const { containerName, fieldNames, path } = props;
  const { subqueries, removeSubquery } = useStore();
  const subquery = getLogicalSubquery(subqueries, props.path);
  const formsProp: keyof LogicalSubquery = "forms";

  const handleRemove = () => {
    removeSubquery(path);
  };

  return (
    <div className="border border-slate-400 w-full py-2 my-2">
      <div>
        <p>{subquery.operator.toUpperCase()}</p>
        <Button onClick={handleRemove}>
          <Remove />
        </Button>
      </div>
      {subquery.error && <Warning>{subquery.error}</Warning>}
      <div>
        <SubqueriesEditor
          containerName={containerName}
          fieldNames={fieldNames}
          path={[...path, formsProp]}
        />
      </div>
    </div>
  );
}
