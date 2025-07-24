import {
  ComparisonEditor,
  ComparisonEditorProps,
} from "./ComparisonEditor.tsx";
import { useStore } from "../../../store/useStore.ts";
import { useContainerFields } from "../../../client/endpoint/useContainerFields.tsx";
import {
  isComparisonSubquery,
  isLogicalSubquery,
  LogicalSubquery,
  Subquery,
} from "../../../model/query/QueryModel.ts";
import { getLogicalSubquery } from "../../../store/query/util/getLogicalSubquery.ts";
import { getOrThrow } from "../../../store/query/util/getOrThrow.ts";
import { Warning } from "../Warning.tsx";

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
            <LogicalEditor
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

export function LogicalEditor(props: ComparisonEditorProps) {
  const { containerName, fieldNames, path } = props;
  const { subqueries } = useStore();
  const subquery = getLogicalSubquery(subqueries, props.path);
  const formsProp: keyof LogicalSubquery = "forms";
  return (
    <div className="border border-slate-400 w-full py-2 my-2">
      <p>{subquery.operator}</p>
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
