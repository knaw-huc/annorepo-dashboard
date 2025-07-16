import {
  isArRangeQueryValue, JsonQueryEntry, NO_FIELD,
  SearchQueryJson
} from "../../../model/ArModel.ts";
import {isNumber, isPlainObject, isString} from "lodash";
import {
  ComparisonSubQuery
} from "../../../model/query/QueryModel.ts";
import {
  findMapperByOperator
} from "../../../model/query/value/util/findMapperByOperator.ts";
import {QueryValue} from "../../../model/query/value/QueryValue.ts";
import {Operator} from "../../../model/query/operator/Operator.ts";
import {isRangeQueryOperator} from "../../../model/query/operator/RangeQueryOperator.ts";
import {isNonFnOperator} from "../../../model/query/operator/NonFnQueryOperator.ts";
import {QueryValueType} from "../../../model/query/value/QueryValueType.ts";

export function toQueryFieldForm(
  entry: JsonQueryEntry,
  // Query entry contains param when passing a template:
  params?: string[]
): ComparisonSubQuery {
  const [queryKey, queryValue] = entry
  let field;
  let value: QueryValue;
  let operator: Operator
  let valueType: QueryValueType

  if (isRangeQueryOperator(queryKey)) {
    // Range function query:

    field = NO_FIELD
    operator = queryKey as Operator
    if (containsParams(queryValue, params)) {

      /**
       * TODO: are number params supported?
       *  And if so: how to find the correct type?
       */
      const mapper = findMapperByOperator(operator);
      value = mapper.defaultValue
      valueType = mapper.type
    } else if (isArRangeQueryValue(queryValue)) {
      value = queryValue
      valueType = 'range'
    } else {
      throwUnexpected(queryValue, 'range', entry);
    }
  } else if (isString(queryValue)) {
    // Simple query:

    field = queryKey
    operator = Operator.simpleQuery
    if (containsParams(queryValue, params)) {
      /**
       * TODO: are number params supported?
       *  And if so: how to find the correct type?
       */
      const mapper = findMapperByOperator(Operator.simpleQuery);
      value = mapper.defaultValue
      valueType = mapper.type
    } else {
      if (isNumber(queryValue)) {
        value = queryValue
        valueType = 'number'
      } else if (isString(queryValue)) {
        value = queryValue
        valueType = 'string'
      } else {
        throwUnexpected(queryValue, 'number or string', entry);
      }
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
      /**
       * TODO: are number params supported?
       *  And if so: how to find the correct type?
       */
      const mapper = findMapperByOperator(operator);
      value = mapper.defaultValue
      valueType = mapper.type
    } else if (isNumber(queryObjectValue)) {
      value = queryObjectValue
      valueType = 'number'
    } else if (isString(queryObjectValue)) {
      value = queryObjectValue
      valueType = 'string'
    } else {
      throwUnexpected(queryObjectValue, 'number or string', entry);
    }
  }

  return {
    field,
    operator,
    value,
    valueType
  };
}

function throwUnexpected(
  got: any,
  expected: string,
  entry: JsonQueryEntry
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
  query: SearchQueryJson,
  params?: string[]
): ComparisonSubQuery[] {
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