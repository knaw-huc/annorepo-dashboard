import {
  isNonFnOperator,
  isRangeQueryOperator,
  isRangeQueryValue,
  NO_FIELD,
  QueryOperator,
  QueryValue,
  SearchQuery
} from "../../../client/ArModel.ts";
import {isNumber, isPlainObject, isString} from "lodash";
import {
  FieldQueryForm,
  QueryEntry
} from "../../../component/common/search/QueryModel.ts";
import {
  findMapper
} from "../../../component/common/search/util/findMapper.tsx";

export function toQueryFieldForm(
  entry: QueryEntry,
  // Query entry contains param when passing a template:
  params?: string[]
): FieldQueryForm {
  const [queryKey, queryValue] = entry
  let field;
  let value: QueryValue;
  let operator: QueryOperator

  if (isRangeQueryOperator(queryKey)) {
    // Range function query:
    field = NO_FIELD
    operator = queryKey as QueryOperator
    if (containsParams(queryValue, params)) {
      value = findMapper(operator).defaultValue
    } else if (isRangeQueryValue(queryValue)) {
      value = queryValue
    } else {
      throwUnexpected(queryValue, 'range', entry);
    }
  } else if (isString(queryValue)) {
    // Simple query:
    field = queryKey
    operator = QueryOperator.simpleQuery
    if (containsParams(queryValue, params)) {
      value = findMapper(QueryOperator.simpleQuery).defaultValue
    } else {
      value = queryValue
    }
  } else {
    // Operator query:
    field = queryKey
    if (!isPlainObject(queryValue)) {
      throwUnexpected(queryValue, 'object', entry);
    }
    const [
      queryObjectKey,
      queryObjectValue
    ] = Object.entries(queryValue as object)[0]
    if (!isNonFnOperator(queryObjectKey)) {
      throwUnexpected(queryObjectKey, 'non-function operator', entry);
    }
    operator = queryObjectKey
    if (containsParams(queryObjectValue, params)) {
      value = findMapper(operator).defaultValue
    } else if (isNumber(queryObjectValue) || isString(queryObjectValue)) {
      value = queryObjectValue
    } else {
      throwUnexpected(queryObjectValue, 'number or string', entry);
    }
  }

  return {
    field,
    operator,
    value
  };
}

function throwUnexpected(
  got: any,
  expected: string,
  entry: QueryEntry
): never {
  throw new Error(`Expected ${
    expected
  } but got ${
    JSON.stringify(got)
  } in ${
    JSON.stringify(entry)
  }`)
}

export function toQueryFieldForms(
  query: SearchQuery,
  params?: string[]
): FieldQueryForm[] {
  return Object.entries(query).map((entry) => {
    return toQueryFieldForm(entry, params)
  })
}

export function containsParams(
  queryValue: string,
  params?: string[]
): boolean {
  return params
      ?.some(param => queryValue.includes(param))
    || false
}