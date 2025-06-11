import {
  isRangeQueryOperator, isRangeQueryValue,
  QueryOperator,
  SearchQuery,
  SearchSubquery
} from "../../../client/ArModel.ts";
import {objectEntries} from "../../../util/objectEntries.ts";
import {FieldQueryForm} from "../../../component/common/search/QueryModel.ts";

export function toSearchQuery(
  forms: FieldQueryForm[]
): SearchQuery {
  const subqueries = forms.map(f => convertToSubquery(f));
  return mergeForms(subqueries)
}

function mergeForms(
  subqueries: SearchSubquery[]
): SearchQuery {
  const merged: Record<string, any> = {};
  for (const subquery of subqueries) {
    const fields = Object.keys(subquery)
    if (fields.length > 1) {
      throw new Error('expect one field per subquery')
    }
    for (const [key, value] of objectEntries(subquery)) {
      if (!key) {
        throw new Error(`subquery needs a key (value was: ${JSON.stringify(value)})`)
      }
      if (key in merged) {
        throw new Error(
          `field '${key}' already exists.`
        );
      }
      merged[key] = value;
    }
  }

  return merged;
}

function convertToSubquery(
  form: FieldQueryForm
): SearchSubquery {
  if (form.operator === QueryOperator.simpleQuery) {
    return {[form.field]: `${form.value}`}
  } else if (isRangeQueryOperator(form.operator)) {
    if (!isRangeQueryValue(form.value)) {
      throw new Error('Expected range but got: ' + JSON.stringify(form.value))
    }
    return {[form.operator]: form.value}
  } else {
    return {[form.field]: {[form.operator]: form.value}}
  }
}
