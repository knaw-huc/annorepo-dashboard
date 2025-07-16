import {
  ArSearchSubQuery, isArRangeQueryValue,
  SearchQueryJson
} from "../../../model/ArModel.ts";
import {objectEntries} from "../../../util/objectEntries.ts";
import {
  ComparisonSubQuery
} from "../../../model/query/QueryModel.ts";
import {isString} from "lodash";
import {toParamTag} from "./toParamTag.ts";
import {Operator} from "../../../model/query/operator/Operator.ts";
import {isRangeQueryOperator} from "../../../model/query/operator/RangeQueryOperator.ts";
import {FormParamValue} from "../../../model/query/FormParamValue.ts";

export function toSearchQuery(
  forms: ComparisonSubQuery[],
  params: FormParamValue[]
): SearchQueryJson {
  const subqueries = forms.map((f,i) => convertToSubquery(f, params[i]));
  return mergeForms(subqueries)
}

function mergeForms(
  subqueries: ArSearchSubQuery[]
): SearchQueryJson {
  const merged: Record<string, any> = {};
  for (const subquery of subqueries) {
    const fields = Object.keys(subquery)
    if (fields.length > 1) {
      throw new Error('Expect one field per subquery')
    }
    for (const [key, value] of objectEntries(subquery)) {
      if (!key) {
        throw new Error(`Subquery field cannot be empty`)
      }
      if (key in merged) {
        throw new Error(
          `'${key}' already exists.`
        );
      }
      merged[key] = value;
    }
  }

  return merged;
}

function convertToSubquery(
  form: ComparisonSubQuery,
  param?: FormParamValue
): ArSearchSubQuery {
  const formValue = isString(param) ? toParamTag(param) : form.value;
  if (form.operator === Operator.simpleQuery) {
    return {[form.field]: `${isString(param) ? param : form.value}`}
  } else if (isRangeQueryOperator(form.operator)) {
    if (!param && !isArRangeQueryValue(formValue)) {
      throw new Error('Expected range but got: ' + JSON.stringify(formValue))
    }
    return {[form.operator]: formValue}
  } else {
    return {[form.field]: {[form.operator]: formValue}}
  }
}
