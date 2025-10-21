import { useStore } from "../../../store/useStore.ts";
import { getLogicalSubquery } from "../../../store/query/util/path/getLogicalSubquery.ts";
import { Warning } from "../Warning.tsx";
import { formsPropPath } from "../../../store/query/formsPropPath.ts";
import { PropsWithChildren } from "react";
import { PropertyName } from "lodash";
import { AddSubqueryDropdownMenu } from "./AddSubqueryDropdownMenu.tsx";
import { NeutralButton } from "../NeutralButton.tsx";
import { Cross } from "../icon/Cross.tsx";

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
      </div>
      {subquery.queryError && <Warning>{subquery.queryError}</Warning>}
      <>
        {
          // Subqueries in forms property of logical subquery:
          props.children
        }
      </>
      <div className="flex mt-4">
        <AddSubqueryDropdownMenu
          path={newSubqueryPath}
          disabled={!!subquery.queryError}
        />
        <NeutralButton
          className="ml-2 p-2 cursor-pointer"
          onClick={handleRemove}
          disabled={!!subquery.queryError}
          borderColor="border-anrep-pink-200"
        >
          <Cross />
        </NeutralButton>
      </div>
    </div>
  );
}
