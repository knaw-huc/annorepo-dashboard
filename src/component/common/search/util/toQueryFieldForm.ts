import {FieldQueryForm, QueryEntry} from "../SubQuerySearchForm.tsx";
import {
  isNonFnOperator,
  isRangeQueryOperator,
  isRangeQueryValue,
  NO_FIELD,
  QueryOperator,
  QueryValue
} from "../../../../client/ArModel.ts";
import {isNumber, isPlainObject, isString} from "lodash";

export function toQueryFieldForm(
  entry: QueryEntry
): FieldQueryForm {
  const [queryKey, queryValue] = entry
  let field;
  let value: QueryValue;
  let operator: QueryOperator

  if (isString(queryValue)) {
    // Simple query:
    field = queryKey
    operator = QueryOperator.simpleQuery
    value = queryValue
  } else if (isRangeQueryOperator(queryValue)) {
    // Function query:
    if (!isRangeQueryValue(queryValue)) {
      throwUnexpected(queryValue, 'range', entry);
    }
    field = NO_FIELD
    operator = queryKey as QueryOperator
    value = queryValue
  } else {
    // Operator query:
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
    if (!isNumber(queryObjectValue) && !isString(queryObjectValue)) {
      throwUnexpected(queryObjectKey, 'number or string', entry);
    }
    field = queryKey
    operator = queryObjectKey
    value = queryObjectValue
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
