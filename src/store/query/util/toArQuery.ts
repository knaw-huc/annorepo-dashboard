import {
  ArComparisonRecord,
  ArLogicalRecord,
  ArQuery,
  ArSubqueryRecord,
  isArOptionQueryValue,
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
import { isPristine } from "./isPristine.ts";
import { isOptionQueryOperator } from "../../../model/query/operator/OptionQueryOperator.ts";
import { ValueError } from "./error/ValueError.ts";
import { SubqueryError } from "./error/SubqueryError.ts";
import { findMapperByValueType } from "../../../model/query/value/util/findMapperByValueType.ts";

/**
 * From internal to AR query
 * See also {@link toQuery}
 */
export function toArQuery(
  subqueries: Subquery[],
  asTemplate: boolean,
): ArQuery {
  return mergeArEntries(
    subqueries
      .filter((f) => !isPristine(f))
      .map((sq) => toArSubquery(sq, asTemplate)),
  );
}

function mergeArEntries(subqueries: ArSubqueryRecord[]): ArQuery {
  const merged: Record<string, Any> = {};
  for (const subquery of subqueries) {
    const fields = Object.keys(subquery);
    if (fields.length > 1) {
      throw new SubqueryError("Expect one field per subquery");
    }
    for (const [key, value] of objectEntries(subquery)) {
      if (!key) {
        throw new Error(`Subquery field cannot be empty`);
      }
      if (key in merged) {
        throw new SubqueryError(`'${key}' already exists.`);
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
  const mapper = findMapperByValueType(form.valueType);
  const value =
    asTemplate && param !== false
      ? toParamTag(param)
      : mapper.toValue(form.inputValue);
  if (subquery.form.operator === ComparisonOperator.simpleQuery) {
    return { [form.field]: `${value}` };
  } else if (isRangeQueryOperator(form.operator)) {
    if (!isArRangeQueryValue(value)) {
      throw new ValueError(
        'Invalid format, example: {"source":  "url", "start": 0, "end": 1}',
      );
    } else {
      return { [form.operator]: value };
    }
  } else if (isOptionQueryOperator(form.operator)) {
    if (!isArOptionQueryValue(value)) {
      throw new ValueError('Invalid format, example: ["a","b"]');
    } else {
      return { [form.field]: { [form.operator]: value } };
    }
  } else {
    return { [form.field]: { [form.operator]: value } };
  }
}
