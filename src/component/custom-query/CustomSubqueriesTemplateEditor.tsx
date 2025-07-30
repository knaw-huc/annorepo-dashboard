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
import { CustomComparisonSubqueryEditor } from "../common/search/CustomComparisonSubqueryEditor.tsx";
import { CheckboxWithLabel } from "../common/form/CheckboxWithLabel.tsx";
import { Tooltip } from "../common/Tooltip.tsx";
import { Help } from "../common/icon/Help.tsx";

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
            <div key={subqueryPath.join()} className="flex items-center">
              <CustomComparisonSubqueryEditor
                path={subqueryPath}
                isCall={false}
              />
              <div className="ml-4">
                <CheckboxWithLabel
                  label={
                    <Tooltip text="Search with a variable parameter, or use a fixed value">
                      Parameter <Help />
                    </Tooltip>
                  }
                  value={subquery.param !== false}
                  onChange={(update) =>
                    props.onParameterChange(subqueryPath, update)
                  }
                />
              </div>
            </div>
          );
        } else {
          throw new Error(`Unexpected subquery: ${JSON.stringify(subquery)}`);
        }
      })}
    </div>
  );
}
