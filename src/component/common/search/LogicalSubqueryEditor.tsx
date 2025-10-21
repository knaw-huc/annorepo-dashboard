import { useStore } from "../../../store/useStore.ts";
import { getLogicalSubquery } from "../../../store/query/util/path/getLogicalSubquery.ts";
import { Warning } from "../Warning.tsx";
import { formsPropPath } from "../../../store/query/formsPropPath.ts";
import { PropsWithChildren } from "react";
import { PropertyName } from "lodash";
import { NeutralButton } from "../NeutralButton.tsx";
import { Cross } from "../icon/Cross.tsx";
import { LogicalOperatorTitle } from "./LogicalOperatorTitle.tsx";
import { AddSubqueryButtonMenu } from "./AddSubqueryButtonMenu.tsx";
import { AddSubqueryDropdownMenu } from "./AddSubqueryDropdownMenu.tsx";

export type WithPath = { path: PropertyName[] };

export function LogicalSubqueryEditor<T extends WithPath>(
  props: PropsWithChildren<T>,
) {
  const { path } = props;
  const { subqueries, removeSubquery } = useStore();
  const subquery = getLogicalSubquery(subqueries, path);

  const handleRemove = () => {
    if (!window.confirm("Remove subquery?")) {
      return;
    }
    removeSubquery(path);
  };

  const newSubqueryPath = [...path, formsPropPath, subquery.forms.length];
  return (
    <div className="bg-anrep-pink-100/50 p-4 rounded-xl flex flex-col gap-4">
      {subquery.queryError && <Warning>{subquery.queryError}</Warning>}
      <>
        {
          // Subqueries in forms property of logical subquery:
          props.children
        }
      </>
      {subquery.forms.length === 1 && (
        <LogicalOperatorTitle operator={subquery.operator} />
      )}
      {!subquery.forms.length && (
        <div className="flex">
          <AddSubqueryButtonMenu
            path={newSubqueryPath}
            disabled={!!subquery.queryError}
          />
          <NeutralButton
            className="ml-2 p-2 cursor-pointer"
            onClick={handleRemove}
            borderColor="border-anrep-pink-200"
          >
            <Cross />
          </NeutralButton>
        </div>
      )}
      {!!subquery.forms.length && (
        <div className="flex">
          <AddSubqueryDropdownMenu
            path={newSubqueryPath}
            disabled={!!subquery.queryError}
          />
          <NeutralButton
            className="ml-2 p-2 cursor-pointer"
            onClick={handleRemove}
            borderColor="border-anrep-pink-200"
          >
            <Cross />
          </NeutralButton>
        </div>
      )}
    </div>
  );
}
