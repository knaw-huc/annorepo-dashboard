import {
  ArCompareRecord,
  isArRangeQueryValue,
  SearchQueryJson,
} from "../../../model/ArModel.ts";
import { objectEntries } from "../../../util/objectEntries.ts";
import {
  isLogicalSubquery,
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
  const arSubqueries = subqueries.map((sq) =>
    convertToArSubquery(sq, asTemplate),
  );
  return mergeForms(arSubqueries);
}

function mergeForms(subqueries: ArCompareRecord[]): SearchQueryJson {
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
): ArCompareRecord {
  if (isLogicalSubquery(subquery)) {
    // TODO
    console.log("TODO: handle LogicalSubquery");
    return {};
  }
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
