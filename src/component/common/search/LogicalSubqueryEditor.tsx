import { useStore } from "../../../store/useStore.ts";
import { getLogicalSubquery } from "../../../store/query/util/path/getLogicalSubquery.ts";
import { DeprecatedButton } from "../DeprecatedButton.tsx";
import { Remove } from "../icon/Remove.tsx";
import { Warning } from "../Warning.tsx";
import { formsPropPath } from "../../../store/query/formsPropPath.ts";
import { PropsWithChildren } from "react";
import { PropertyName } from "lodash";
import { AddSubqueryDropdownMenu } from "../../custom-query/AddSubqueryDropdownMenu.tsx";

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
    <div className="bg-anrep-pink-100/50 p-4 rounded-xl flex flex-col gap-4">
      <div>
        <div className="font-bold text-anrep-pink-700">
          {subquery.operator.toUpperCase().replace(":", "")}
        </div>
        <AddSubqueryDropdownMenu
          path={newSubqueryPath}
          disabled={!!subquery.queryError}
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
