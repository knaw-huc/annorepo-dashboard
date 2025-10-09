import { useStore } from "../../../store/useStore.ts";
import { getLogicalSubquery } from "../../../store/query/util/path/getLogicalSubquery.ts";
import { DeprecatedButton } from "../DeprecatedButton.tsx";
import { Remove } from "../icon/Remove.tsx";
import { Warning } from "../Warning.tsx";

import { AddComparisonSubqueryButton } from "./button/AddComparisonSubqueryButton.tsx";
import { AddLogicalSubqueryButton } from "./button/AddLogicalSubqueryButton.tsx";
import { LogicalOperator } from "../../../model/query/operator/Operator.ts";
import { formsPropPath } from "../../../store/query/formsPropPath.ts";
import { PropsWithChildren } from "react";
import { PropertyName } from "lodash";

export type WithPath = { path: PropertyName[] };

export function LogicalSubqueryEditor<T extends WithPath>(
  props: PropsWithChildren<T>,
) {
  const { path } = props;
  const { subqueries, removeSubquery } = useStore();
  const subquery = getLogicalSubquery(subqueries, path);

  const handleRemove = () => {
    removeSubquery(path);
  };

  const newSubqueryPath = [...path, formsPropPath, subquery.forms.length];

  return (
    <div className="border border-slate-400 w-full p-2 my-2">
      <div>
        <p>{subquery.operator.toUpperCase()}</p>

        <AddComparisonSubqueryButton
          path={newSubqueryPath}
          isParam={false}
          disabled={!!subquery.queryError}
        />
        <AddLogicalSubqueryButton
          path={newSubqueryPath}
          disabled={!!subquery.queryError}
          operator={LogicalOperator.and}
          className="ml-3"
        />
        <AddLogicalSubqueryButton
          path={newSubqueryPath}
          disabled={!!subquery.queryError}
          operator={LogicalOperator.or}
          className="ml-3"
        />
        <DeprecatedButton onClick={handleRemove} secondary className="ml-3">
          <Remove />
        </DeprecatedButton>
      </div>
      {subquery.queryError && <Warning>{subquery.queryError}</Warning>}
      <div>
        {
          // Subqueries in forms property of logical subquery:
          props.children
        }
      </div>
    </div>
  );
}
