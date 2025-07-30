import {
  ArComparisonRecord,
  ArLogicalRecord,
  ArQuery,
  ArSubqueryRecord,
  isArRangeQueryValue,
} from "../../../model/ArModel.ts";
import { objectEntries } from "../../../util/objectEntries.ts";
import {
  ComparisonSubquery,
  isLogicalSubquery,
  LogicalSubquery,
  Subquery,
} from "../../../model/query/QueryModel.ts";
import { toParamTag } from "./toParamTag.ts";
import { ComparisonOperator } from "../../../model/query/operator/Operator.ts";
import { isRangeQueryOperator } from "../../../model/query/operator/RangeQueryOperator.ts";
import { Any } from "../../../model/Any.ts";

/**
 * From internal to AR query
 * See also {@link toQuery}
 */
export function toArQuery(
  subqueries: Subquery[],
  asTemplate: boolean,
): ArQuery {
  return mergeArEntries(subqueries.map((sq) => toArSubquery(sq, asTemplate)));
}

function mergeArEntries(subqueries: ArSubqueryRecord[]): ArQuery {
  const merged: Record<string, Any> = {};
  for (const subquery of subqueries) {
    const fields = Object.keys(subquery);
    if (fields.length > 1) {
      throw new Error("Expect one field per subquery");
    }
    for (const [key, value] of objectEntries(subquery)) {
      if (!key) {
        throw new Error(`Subquery field cannot be empty`);
      }
      if (key in merged) {
        throw new Error(`'${key}' already exists.`);
      }
      merged[key] = value;
    }
  }

  return merged;
}

function toArSubquery(
  subquery: Subquery,
  asTemplate: boolean = false,
): ArSubqueryRecord {
  if (isLogicalSubquery(subquery)) {
    return toArLogical(subquery, asTemplate);
  }
  return toArComparison(subquery, asTemplate);
}

function toArLogical(
  subquery: LogicalSubquery,
  asTemplate: boolean,
): ArLogicalRecord {
  const { operator, forms } = subquery;
  return {
    [operator]: forms.map((f) => toArSubquery(f, asTemplate)),
  };
}

function toArComparison(
  subquery: ComparisonSubquery,
  asTemplate: boolean,
): ArComparisonRecord {
  const { param, form } = subquery;
  const value = asTemplate && param !== false ? toParamTag(param) : form.value;
  if (subquery.form.operator === ComparisonOperator.simpleQuery) {
    return { [form.field]: `${value}` };
  } else if (isRangeQueryOperator(form.operator)) {
    if (!isArRangeQueryValue(value)) {
      throw new Error("Expected range but got: " + JSON.stringify(value));
    } else {
      return { [form.operator]: value };
    }
  } else {
    return { [form.field]: { [form.operator]: value } };
  }
}
