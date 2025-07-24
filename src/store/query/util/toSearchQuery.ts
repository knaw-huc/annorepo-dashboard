import {
  ArCompareRecord,
  ArLogicalRecord,
  ArSubqueryRecord,
  isArRangeQueryValue,
  SearchQueryJson,
} from "../../../model/ArModel.ts";
import { objectEntries } from "../../../util/objectEntries.ts";
import {
  ComparisonSubquery,
  isLogicalSubquery,
  LogicalSubquery,
  Subquery,
} from "../../../model/query/QueryModel.ts";
import { toParamTag } from "./toParamTag.ts";
import { Operator } from "../../../model/query/operator/Operator.ts";
import { isRangeQueryOperator } from "../../../model/query/operator/RangeQueryOperator.ts";
import { Any } from "./Any.ts";

export function toSearchQuery(
  subqueries: Subquery[],
  asTemplate: boolean,
): SearchQueryJson {
  return toArSubqueryRecord(subqueries, asTemplate);
}

/**
 * Top level query is an implicit :and-query of subqueries grouped inside an object
 * Note: as in every json object, keys (i.e. subquery operators or fields) can appear only once
 */
function toArSubqueryRecord(
  subqueries: Subquery[],
  asTemplate: boolean,
): ArSubqueryRecord {
  const arRecords = subqueries.map((sq) => convertToArSubquery(sq, asTemplate));
  return mergeArSubqueryRecords(arRecords);
}

function mergeArSubqueryRecords(
  subqueries: ArSubqueryRecord[],
): SearchQueryJson {
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

function convertToArSubquery(
  subquery: Subquery,
  asTemplate: boolean = false,
): ArSubqueryRecord {
  if (isLogicalSubquery(subquery)) {
    return toArLogical(subquery, asTemplate);
  }
  return toArCompare(subquery, asTemplate);
}

function toArLogical(
  subquery: LogicalSubquery,
  asTemplate: boolean,
): ArLogicalRecord {
  return {
    [subquery.operator]: toArSubqueryRecord(subquery.forms, asTemplate),
  };
}

function toArCompare(
  subquery: ComparisonSubquery,
  asTemplate: boolean,
): ArCompareRecord {
  const { param, form } = subquery;
  const value = asTemplate && param !== false ? toParamTag(param) : form.value;
  if (subquery.form.operator === Operator.simpleQuery) {
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
